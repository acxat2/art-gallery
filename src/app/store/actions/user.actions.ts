import { createAction, props } from "@ngrx/store";
import { User } from "../reducers/user.reducers";

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{user: User}>()
)
