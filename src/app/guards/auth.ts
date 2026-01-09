export const auth = {
  isQuestIn: false,
  isLoggedIn: false,
  newYearIn: false,
  isAdmin: false,
  preNewYear: false,
}

const date = new Date();
const month = date.getMonth().toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1 );
const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
export const now = date.getFullYear().toString() + '.' + month  + '.' + day;
export const dateNewYearActive = '2026.01.01';
export const dateNewYearEnd = '2026.01.10'

if (now < dateNewYearEnd) {
  auth.preNewYear = true;
}

if (now >= dateNewYearActive && now < '2026.01.10') {
  auth.newYearIn = true;
}
