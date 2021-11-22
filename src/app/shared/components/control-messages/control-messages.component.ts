import {Component, Input} from '@angular/core';
import {ValidatorsService} from './validators.service';


@Component({
    selector: 'control-messages',
    template: `
        <div class="caption" [ngClass]="status?status:'status-danger'" *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
})
export class ControlMessagesComponent {
    @Input() control: any = {
        errors: [],
    };
    @Input() status: string;
    @Input() noTouched: boolean;

    constructor(private validator: ValidatorsService) {
    }

    get errorMessage(): any {
        if (this.control.errors !== undefined) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && (!this.noTouched ? this.control.touched : true)) {
                    return this.validator.getMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }
        return null;
    }

}
