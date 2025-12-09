export function dateFormate(date: string): string {
  return date.split('-').reverse().join('.');
}

export function checkDateFromMonth(date: string): string {   // DD.MM
  const months: {[key: string]: string} = {
    '01': '31',
    '02': '28',
    '03': '31',
    '04': '30',
    '05': '31',
    '06': '30',
    '07': '31',
    '08': '31',
    '09': '30',
    '10': '31',
    '11': '30',
    '12': '31',
  }

  const split = date.split('.');
  if (split[1].includes(' ') || split[1] === '00') return '  .  ';
  if (months[split[1]] && (split[0] === '00' || split[0].includes(' '))) return '  .' + split[1];

  return split[0] <= months[split[1]] ? date : (months[split[1]] + '.' + split[1])
}

export const reverseDate = (date: string): string => date.split('.').reverse().join('.');

export const formateInsertDate = (date: string): string => {
  const splitDate = date.split('.').reverse();

  if (splitDate.length === 1) return '  .  .' + splitDate[0];
  else if (splitDate.length === 2) return '  .' + splitDate.join('.');
  else return splitDate.join('.');
}

export const clineReverseDate = (date: string): string => {
  return reverseDate(date.replace(/  ./g, ''));

}

