import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction('[Authsss] Login Success');
export const loginFailure = createAction('[Authsss] Login Failure');
export const closeLoginPopup = createAction('[Authsss] Close Login Popup');