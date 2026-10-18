/** Quote arbitrary text as a valid XPath string literal. */
export function xpathLiteral(value) {
  if (!value.includes('"')) return `"${value}"`;
  if (!value.includes("'")) return `'${value}'`;
  return `concat(${value.split('"').map((part) => `"${part}"`).join(', \'"\', ')})`;
}
