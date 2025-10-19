export type role = 'user' | 'family' | 'friend' | 'admin'

export type TUser = {
  role: role,
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

export type TAuthUser = Pick<TUserReg, 'password' | 'login'>

