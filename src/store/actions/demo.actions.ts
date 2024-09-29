import { createAction, props } from '@ngrx/store';

export const demoSuccess = createAction('Demo] Login Success');
export const demoFailure = createAction('[Demo] Login Failure');
export const closeDemoPopup = createAction('[Demo] Close Login Popup');