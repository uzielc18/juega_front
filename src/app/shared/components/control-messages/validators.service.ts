import {Injectable} from '@angular/core';

@Injectable()
export class ValidatorsService {

    getMessage(validatorName: string, validatorValue?: any): any {
        const config = {
            required: 'Campo requerido',
            email: 'Correo electronico invalido'
        };
        return config[validatorName];
    }
}
