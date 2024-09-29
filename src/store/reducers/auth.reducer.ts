import { createReducer, on } from '@ngrx/store';
import { loginSuccess, closeLoginPopup, loginFailure } from '../actions/auth.actions';
import { demoSuccess, demoFailure } from '../actions/demo.actions';

export interface AuthState {
  isLoggedIn: boolean;
  showLoginPopup: boolean;
}

export const initialState: AuthState = {
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
  on(loginSuccess, (state: any) => ({ ...state, isLoggedIn: true, showLoginPopup: true })),
  on(loginFailure, (state: any) => ({ ...state, isLoggedIn: "fffffffffffffffffffff", showLoginPopup: "fffffffffffffsdfsdfsdfsdfsdfsdfsdfsdf" })),
  on(closeLoginPopup, (state: any) => ({ ...state, showLoginPopup: false }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}


const _deReducer = createReducer(
  initialDemoState,
  on(demoSuccess, (state: any) => ({ ...state, isDemoIn: true, showDemoPopup: true })),
  on(demoFailure, (state: any) => ({ ...state, isDemoIn: "fffffffffffffffffffff", showDemoPopup: "fffffffffffffsdfsdfsdfsdfsdfsdfsdfsdf" })),
  on(closeLoginPopup, (state: any) => ({ ...state, showDemoPopup: false }))
);

export function demoReducer(state: any, action: any) {
  return _deReducer(state, action);
}