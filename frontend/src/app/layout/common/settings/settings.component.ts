import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config';
import { FuseTailwindService } from '@fuse/services/tailwind';
import { AppConfig, Scheme, Theme } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';

@Component({
    selector     : 'settings',
    templateUrl  : './settings.component.html',
    styles       : [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy
{
    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    themes: [string, any][] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _fuseTailwindService: FuseTailwindService
    )
    {
    }

    ngOnInit(): void
    {
        this._fuseTailwindService.tailwindConfig$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.themes = Object.entries(config.themes);
            });

        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {
                this.config = config;
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setLayout(layout: string): void
    {
        this._router.navigate([], {
            queryParams        : {
                layout: null
            },
            queryParamsHandling: 'merge'
        }).then(() => {
            this._fuseConfigService.config = {layout};
        });
    }

    setScheme(scheme: Scheme): void
    {
        this._fuseConfigService.config = {scheme};
    }

    setTheme(theme: Theme): void
    {
        this._fuseConfigService.config = {theme};
    }
}
