import { Injectable } from '@angular/core';
import { DefaultTreeviewI18n } from 'ngx-treeview';

@Injectable()
export class DropdownTreeviewSelectI18n extends DefaultTreeviewI18n {
    getText(selection:any) {
        if (selection['checkedItems'].length === 0) {
            return selection ? selection['checkedItems'].length + ' '  + 'seleccionados' : 'Seleccione';
        }
        if (selection['checkedItems'].length === 1) {
            return selection ? selection['checkedItems'][0].text : 'Seleccione';
        }
        if (selection['checkedItems'].length > 1) {
            // console.log(selection['checkedItems']);
            // const nameArray:any = [];
            // selection['checkedItems'].map((re:any) => {
            //     nameArray.push(re.text);
            // })
            // return nameArray ? nameArray.join(', ') : 'Seleccione';
            return selection ? selection['checkedItems'].length + ' '  + 'seleccionados'  : 'Seleccione';

        }
    }
    getFilterPlaceholder() {
        return 'Buscar por nombre';
    }
    getAllCheckboxText() {
        return 'Todos';
    }

}