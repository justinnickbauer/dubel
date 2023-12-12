import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _authService: AuthService)
    {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let newReq = req.clone();

        // Request
        //
        // Wenn das Zugriffstoken nicht abgelaufen ist, wird der Authorization-Header hinzugefügt.
        // Wir fügen den Authorization-Header nicht hinzu, wenn das Zugriffstoken abgelaufen ist.
        // Dadurch wird der Server gezwungen, eine "401 Unauthorized"-Antwort zurückzugeben
        // für die geschützten API-Routen zurück, die unser Response Interceptor
        // abfängt und das Zugriffstoken aus dem lokalen Speicher löscht, während er
        // Benutzer aus der Anwendung abmeldet.

        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });
        }

        return next.handle(newReq).pipe(
            catchError((error) => {

                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    this._authService.signOut();
                    location.reload();
                }

                return throwError(error);
            })
        );
    }
}
