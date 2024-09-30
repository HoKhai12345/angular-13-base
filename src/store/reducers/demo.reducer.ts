import { createReducer, on } from '@ngrx/store';
import { loginSuccess, closeLoginPopup, loginFailure } from '../actions/auth.actions';
import { demoSuccess, demoFailure } from '../actions/demo.actions';

export interface DemoState {
  isDemoIn: boolean;
  showDemoPopup: boolean;
}

export const initialDemoState: DemoState = {
  isDemoIn: false,
  showDemoPopup: false
};



const _deReducer = createReducer(
  initialDemoState,
  on(demoSuccess, (state: any) => ({ ...state, isDemoIn: true, showDemoPopup: true })),
  on(demoFailure, (state: any) => ({ ...state, isDemoIn: "DramaKing", showDemoPopup: "DramaKing" })),
  on(closeLoginPopup, (state: any) => ({ ...state, showDemoPopup: false }))
);

export function demoReducer(state: any, action: any) {
  return _deReducer(state, action);
}