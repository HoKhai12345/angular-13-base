import { createReducer, on } from '@ngrx/store';
import { loginSuccess, closeLoginPopup, loginFailure } from '../actions/auth.actions';

export interface AuthState {
  activeAlert: boolean;
  isLoggedIn: boolean;
  showLoginPopup: boolean;
}

export const initialState: AuthState = {
  activeAlert: false,
  isLoggedIn: false,
  showLoginPopup: false
};

export interface DemoState {
  isDemoIn: boolean;
  showDemoPopup: boolean;
}

export const initialDemoState: DemoState = {
  isDemoIn: false,
  showDemoPopup: false
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: any) => ({ ...state, activeAlert: true, isLoggedIn: true, showLoginPopup: true })),
  on(loginFailure, (state: any) => ({ ...state, activeAlert: true, isLoggedIn: true, showLoginPopup: true })),
  on(closeLoginPopup, (state: any) => ({ ...state, showLoginPopup: false }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}