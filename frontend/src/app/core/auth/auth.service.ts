import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    set accessToken(token: string)
    {
        localStorage.setItem('access_token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token') ?? '';
    }

    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('http://localhost:8080/auth/login', credentials).pipe(
            switchMap((response: any) => {

                this.accessToken = response.access_token;

                this._authenticated = true;

                this._userService.user = response.user;

                return of(response);
            })
        );
    }

    signInUsingToken(): Observable<any>
    {
        return this._httpClient.post('http://localhost:8080/auth/refresh', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>
                of(false)
            ),
            switchMap((response: any) => {

                this.accessToken = response.access_token;

                this._authenticated = true;

                this._userService.user = response.user;

                return of(true);
            })
        );
    }

    signOut(): Observable<any>
    {
        localStorage.removeItem('access_token');

        this._authenticated = false;

        return of(true);
    }

    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('http://localhost:8080/auth/login', credentials);
    }

    check(): Observable<boolean>
    {
        if ( this._authenticated )
        {
            return of(true);
        }

        if ( !this.accessToken )
        {
            return of(false);
        }

        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        return this.signInUsingToken();
    }
}
