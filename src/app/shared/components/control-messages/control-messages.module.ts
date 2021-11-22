import {NgModule} from '@angular/core';
import {ControlMessagesComponent} from './control-messages.component';
import {ValidatorsService} from './validators.service';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [ControlMessagesComponent],
    imports: [CommonModule],
    exports: [ControlMessagesComponent],
    providers: [ValidatorsService]
})
export class ControlMessagesModule {
}
