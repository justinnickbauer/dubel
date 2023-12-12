import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from '../../../../core/user/user.service';
import {User} from '../../../../core/user/user.types';
import {takeUntil} from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import {FuseAlertType} from '../../../../../@fuse/components/alert';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class SettingsAccountComponent implements OnInit
{
    @Input()
    user: User;
    @ViewChild('accountNgForm') accountNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;
    accountForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
    )
    {
    }

    ngOnInit(): void
    {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                this._changeDetectorRef.markForCheck();
            });
        this.accountForm = this._formBuilder.group({
            id: [this.user.id],
            firstName: [this.user.firstName],
            lastName: [this.user.lastName],
            email: [this.user.email, Validators.email],
            phoneNumber: [this.user.phoneNumber],
            lastPasswordResetDate: [this.user.lastPasswordResetDate]
        });
    }

    cancel(): void
    {
        this.accountForm = this._formBuilder.group({
            id: [this.user.id],
            firstName: [this.user.firstName],
            lastName: [this.user.lastName],
            email: [this.user.email, Validators.email],
            phoneNumber: [this.user.phoneNumber],
            lastPasswordResetDate: [this.user.lastPasswordResetDate]
        });
    }

    updateUser(): void
    {
        if ( this.accountForm.invalid )
        {
            return;
        }

        this.accountForm.disable();

        this.showAlert = false;

        this._userService.update(this.accountForm.value)
            .subscribe(
                () => {
                    this.accountForm.enable();

                    this.alert = {
                        type   : 'success',
                        message: 'Deine Änderungen wurden erfolgreich gespeichert'
                    };

                    this.showAlert = true;
                },
                (response) => {
                    this.accountForm.enable();

                    this.alert = {
                        type   : 'error',
                        message: response.message
                    };

                    this.showAlert = true;
                }
            );
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
