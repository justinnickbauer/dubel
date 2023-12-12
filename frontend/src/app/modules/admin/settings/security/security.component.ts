import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {Subject} from 'rxjs';
import {PasswordChange} from '../../../../core/user/user.password';
import {UserService} from '../../../../core/user/user.service';
import { fuseAnimations } from '@fuse/animations';
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {AuthService} from "../../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class SettingsSecurityComponent implements OnInit
{
    @Input()
    passwordChange: PasswordChange;
    @ViewChild('securityNgForm') securityNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;
    warningForm: FormGroup;
    securityForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _authService: AuthService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService
    )
    {
    }

    ngOnInit(): void
    {
        this.securityForm = this._formBuilder.group({
            newPassword  : ['']
        });

        this.warningForm = this._formBuilder.group({
            title      : 'Passwort ändern',
            message    : 'Bist Du sicher, dass du Dein Passwort ändern möchtest? <br> <span class="font-medium">Diese Aktion kann nicht rückgängig gemacht werden!</span>',
            icon       : this._formBuilder.group({
                show : true,
                name : 'heroicons_outline:exclamation',
                color: 'warn'
            }),
            actions    : this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show : true,
                    label: 'Bestätigen',
                    color: 'warn'
                }),
                cancel : this._formBuilder.group({
                    show : true,
                    label: 'Abbrechen'
                })
            }),
            dismissible: true
        });
    }

    cancel(): void
    {
        this.securityForm = this._formBuilder.group({
            newPassword  : ['']
        });
    }

    updatePassword(): void
    {
        if ( this.securityForm.invalid )
        {
            return;
        }

        this.securityForm.disable();

        this.showAlert = false;

        this._userService.changePassword(this.securityForm.value)
            .subscribe(
                () => {
                    this.securityForm.enable();
                    this._router.navigate(['/sign-out']);
                },
                (response) => {
                    this.securityForm.enable();

                    this.alert = {
                        type   : 'error',
                        message: response.message
                    };

                    this.showAlert = true;
                }
            );
    }

    openConfirmationDialog(): void
    {
        const dialogRef = this._fuseConfirmationService.open(this.warningForm.value);

        dialogRef.afterClosed().subscribe((result) => {
            if (result.includes('confirmed')) {
                this.updatePassword();
            } else {
                this.cancel();
            }
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
