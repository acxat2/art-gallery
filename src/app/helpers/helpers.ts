export function getFullYear(bd: string): number {
  if (/\d{2}.\d{2}.\d{4}/.test(bd)) {
    bd = bd.split('.').reverse().join('.')
  }
  return Math.floor((Date.now() - Date.parse(bd))/31557600000);
}
