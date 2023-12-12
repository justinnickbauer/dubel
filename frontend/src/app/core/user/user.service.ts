import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import {PasswordChange} from './user.password';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(private _httpClient: HttpClient)
    {
    }

    set user(value: User)
    {
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    get(): Observable<User>
    {
        return this._httpClient.get<User>('api/whoami').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/user/update', user).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    changePassword(passwordChange: PasswordChange): Observable<any>
    {
        return this._httpClient.patch('http://localhost:8080/auth/change-password', passwordChange);
    }
}
