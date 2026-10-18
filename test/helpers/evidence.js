import { mkdirSync, appendFileSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { browser } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
let directory;
let sequence = 0;
function slug(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 110);
}
/** Open a separate evidence folder and restart step numbering for this test. */
export function beginEvidence(title) {
  directory = join('evidence', `${slug(title)}-${randomUUID().slice(0, 8)}`);
  mkdirSync(directory, { recursive: true });
  sequence = 0;
  log('TEST START', title);
}
export function log(status, title, duration) {
  if (!directory) beginEvidence('test');
  const line = `${new Date().toISOString()} | ${status} | ${title}${duration === undefined ? '' : ` | ${duration} ms`}`;
  appendFileSync(join(directory, 'execution.log'), `${line}\n`);
  console.log(line);
}
export function nextStep(title) {
  if (!directory) beginEvidence('test');
  return `${String(++sequence).padStart(3, '0')}-${slug(title)}`;
}
/** Save a named screenshot, or a note when the browser cannot provide one. */
export async function capture(name) {
  if (!directory) beginEvidence('hook');
  try {
    const png = Buffer.from(await browser.takeScreenshot(), 'base64');
    writeFileSync(join(directory, `${name}.png`), png);
    allure.addAttachment(name, png, 'image/png');
  } catch {
    const note = 'Screenshot unavailable: the browser session or a native alert may prevent capture. No alert was dismissed by evidence collection.';
    writeFileSync(join(directory, `${name}-unavailable.txt`), note);
    allure.addAttachment(`${name}-unavailable`, note, 'text/plain');
    log('EVIDENCE UNAVAILABLE', name);
  }
}
/** Attach the completed per-test log to Allure. */
export function finishEvidence(passed) {
  log(passed ? 'TEST PASSED' : 'TEST FAILED', 'Execution finished');
  allure.addAttachment('execution.log', readFileSync(join(directory, 'execution.log')), 'text/plain');
}
