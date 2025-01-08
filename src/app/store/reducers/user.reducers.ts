import { createReducer, on } from "@ngrx/store"
import { signInSuccess } from "../actions/user.actions"

export interface User {
  name: string | null,
  birthday: string | null,
  role?: string | null,
}

export const initialUserState: User = {
  name: null,
  birthday: null,
  role: null
}

export const reducer = createReducer(
  initialUserState,
  on(signInSuccess, (state, {user}) => ({
    ...state,
    ...user
  }))
)
