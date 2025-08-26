type role = 'user' | 'family' | 'friend' | 'admin'

export type User = {
  name: string,
  birthday: string,
  role?: role,
}

export const users: User[] = [
  {
    name: 'Абдулгали',
    birthday: '23.07.1954',
    role: 'user'
  },
  {
    name: 'Александр',
    birthday: '22.10.1983',
    role: 'friend'
  },
  {
    name: 'Алина',
    birthday: '01.05.2008',
    role: 'family'
  },
  {
    name: 'Альбина',
    birthday: '30.07.1980',
    role: 'family'
  },
  {
    name: 'Альфия',
    birthday: '27.07.1984',
    role: 'friend'
  },
  {
    name: 'Анастасия',
    birthday: '17.04.1983',
    role: 'friend'
  },
  {
    name: 'Артур',
    birthday: '30.03.1988',
    role: 'friend'
  },
  {
    name: 'Асхат',
    birthday: '29.10.1982',
    role: 'admin'
  },
  {
    name: 'Виктория',
    birthday: '14.05.1956',
    role: 'friend'
  },
  {
    name: 'Вика',
    birthday: '02.12.2009',
    role: 'friend'
  },

  {
    name: 'Даниил',
    birthday: '08.03.2013',
    role: 'family'
  },
  {
    name: 'Дмитрий',
    birthday: '05.10.1975',
    role: 'friend'
  },
  {
    name: 'Евгений',
    birthday: '01.05.1981',
    role: 'friend'
  },
  {
    name: 'Ефим',
    birthday: '21.03.1983',
    role: 'friend'
  },
  {
    name: 'Ирина',
    birthday: '27.04.1983',
    role: 'friend'
  },
  {
    name: 'Марина',
    birthday: '04.11.1985',
    role: 'friend'
  },
  {
    name: 'Larisa',
    birthday: '25.09.1978',
    role: 'friend'
  },
  {
    name: 'Мурат',
    birthday: '31.01.1980',
    role: 'friend'
  },
  {
    name: 'Нажия',
    birthday: '19.06.1954',
    role: 'friend'
  },
  {
    name: 'Ольга',
    birthday: '18.08.1988',
    role: 'friend'
  },
  {
    name: 'Ольга',
    birthday: '27.09.1959',
    role: 'user'
  },
  {
    name: 'Светлана',
    birthday: '01.11.1986',
    role: 'family'
  },
  {
    name: 'Сергей',
    birthday: '25.08.1983',
    role: 'friend'
  },
  {
    name: 'Сергей',
    birthday: '01.05.1983',
    role: 'friend'
  },
  {
    name: 'Юлия',
    birthday: '08.02.1977',
    role: 'friend'
  },
  {
    name: 'Яна',
    birthday: '15.11.1982',
    role: 'user'
  },
  {
    name: 'Сергей',
    birthday: '26.11.1973',
    role: 'friend'
  },
]
