import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { loginSuccess, loginFailure } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => {
        console.log("loginSuccess", loginSuccess);
        // Logic để hiển thị popup (nếu cần)
        return loginSuccess();
      })
    )
  );
}
