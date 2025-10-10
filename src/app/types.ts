export type role = 'user' | 'family' | 'friend' | 'admin'

export type TUser = {
  role: role,
  id: string,
  username: string,
  birthday: string,
  email?: string | null,
}

export type TUserReg = {
  username: string,
  birthday: string,
  email?: string | null,
  login: string,
  password: string
}

export type TAuthUser = {
  login: string,
  password: string
}
