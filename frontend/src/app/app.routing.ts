import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Leite den angemeldeten Benutzer zur '/example'-Seite weiter
    //
    // Nachdem sich der Benutzer angemeldet hat, wird die Anmeldeseite den Benutzer zum 'signed-in-redirect'
    // Pfad weiterleiten. Unten ist eine weitere Weiterleitung für diesen Pfad, um den Benutzer zum gewünschten Ort weiterzuleiten.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes für Gäste
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)}
        ]
    },

    // Auth routes für authentifizierte Benutzer
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)}
        ]
    },

    // User routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'settings', loadChildren: () => import('app/modules/admin/settings/settings.module').then(m => m.SettingsModule)},
            {path: 'ecommerce', loadChildren: () => import('app/modules/admin/ecommerce/ecommerce.module').then(m => m.ECommerceModule)},
        ]
    }
];
