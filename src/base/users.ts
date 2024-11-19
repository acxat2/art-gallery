export type User = {
  name: string,
  birthday: string,
  role?: string,
}

export const users: User[] = [
  {
    name: 'Светлана',
    birthday: '01.11.1986',
    role: 'family'
  },
  {
    name: 'Даниил',
    birthday: '08.03.2013',
    role: 'family'
  },
  {
    name: 'Асхат',
    birthday: '29.10.1982',
    role: 'admin'
  },
  {
    name: 'Сергей',
    birthday: '25.08.1983',
    role: 'friend'
  },
  {
    name: 'Ефим',
    birthday: '21.03.1983',
    role: 'friend'
  },
  {
    name: 'Альфия',
    birthday: '27.07.1984',
    role: 'friend'
  },
  {
    name: 'Алина',
    birthday: '01.05.2008',
    role: 'family'
  },
  {
    name: 'Ольга',
    birthday: '27.09.1959',
    role: 'user'
  },
  {
    name: 'User',
    birthday: '01.01.2000',
    role: 'user'
  },
]
