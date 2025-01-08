export function dateFormate(date: string): string {
  return date.split('-').reverse().join('.');
}
