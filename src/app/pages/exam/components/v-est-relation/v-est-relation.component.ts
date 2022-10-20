import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-v-est-relation',
  templateUrl: './v-est-relation.component.html',
  styleUrls: ['./v-est-relation.component.scss'],
})
export class VEstRelationComponent implements OnInit {
  @Input() alternativas: any = [];
  @Input() pregunta: any;
  @Output() saveValues = new EventEmitter<any>();

  form: any = FormGroup;

  colors: any = [
    '#1AAE9F',
    '#D3455B',
    '#2BADD3',
    '#F1D00A',
    '#E39800',
    '#F6ACC8',
    '#246C75',
    '#94124E',
    '#002885',
    '#5D1787',

    '#653100',
    '#FF01FF',
    '#023303',
    '#649802',
    '#00FF00',
    '#FFFF89',
    '#804040',
    '#2D001F',
  ];
  // randomListColor: any = [];
  relationList: any[] = [];
  secondList: any[] = [];
  // randomList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));

    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;

    // this.getShuffledColor(this.colors);
    // this.getShuffledArr(this.secondList);
    // this.addCheckA();
    // this.addCheckB();

    // this.setColor();
    // this.recorrer();
  }

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      itemA: [null, [Validators.required]],
      itemB: [null, [Validators.required]],
      temporal: ['']
    };
    this.form = this.fb.group(controls);
  }
  // recorrer() {
  //   this.relationList.map((re:any) => {
  //     if (re.relations_answers_studnet) {
  //       re.checked = true;
  //     }
  //   });
  //   this.secondList.map((re:any) => {
  //     if (re.relations_answers_studnet) {
  //       re.checked = true;
  //     }
  //   });
  // }

  selectedA(item:any, i:any) {
    if (item?.checked) {
      item.checked = false;
      item.color = '';
      item.relations_answers_studnet = null;
      this.form.controls['temporal'].setValue('');
      this.searchArrayB(item);
    } else {
      item.checked = true;
      item.color = this.colors[i];
      this.form.controls['temporal'].setValue(item);
    }
  }
  searchArrayB(value:any) {
    this.secondList.map((re:any) => {
      if (value.id === re.relations_answers_studnet) {
        re.checked = false;
        re.color = '';
        re.relations_answers_studnet = null;
      }
    });
  }
  selectedB(item:any, i:any) {
    if (item?.checked) {
      item.checked = false;
      item.color = '';
      this.searchArrayA(item, item.checked);
      item.relations_answers_studnet = null;
      this.form.controls['temporal'].setValue('');
    } else {
      if (this.form.value.temporal.id) {
        item.checked = true;
        item.color = this.form.value.temporal.color;
        item.relations_answers_studnet = this.form.value.temporal.id;
        this.searchArrayA(item, item.checked);
        this.form.controls['temporal'].setValue('');
      }
    }
  }

  searchArrayA(value:any, check:any) {
    this.relationList.map((re:any) => {
      if (value.relations_answers_studnet === re.id && !check) {
        re.checked = false;
        re.color = '';
        re.relations_answers_studnet = null;
      }
      if (value.relations_answers_studnet === re.id && check) {
        re.relations_answers_studnet = value.id;
      }
    });
  }

  styles(item: any) {
    if (item && item.checked) {
      // console.log(item.color);

      return {
        'background-color': item.color,
        color: 'white',
      };
    } else {
      return {
        'background-color': 'white',
        color: 'black',
      };
    }
  }

  // searchMarker() {
  //   if (this.relationList.length > 0) {
  //     this.relationList.map((el: any, inde:any) => {
  //       this.secondList.map((col: any, index:any) => {
  //         if (el.id === index) {
  //           el.bgcolor = col;
  //           el.color = '#000';
  //           el.selected = false;
  //         }
  //       });
  //       // el.bgcolor = '#EDF1F7';
  //       // el.color = '#000';
  //     });
  //     console.log(this.relationList);

  //   }
  // }











  // getShuffledArr(arr: any) {
  //   const newArr = arr.slice();
  //   for (let i = newArr.length - 1; i > 0; i--) {
  //     const rand = Math.floor(Math.random() * (i + 1));
  //     [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  //   }
  //   this.randomList = newArr;
  // }

  // getShuffledColor(arr: any) {
  //   const newArr = arr.slice();
  //   for (let i = newArr.length - 1; i > 0; i--) {
  //     const rand = Math.floor(Math.random() * (i + 1));
  //     [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  //   }
  //   this.randomListColor = newArr;
  // }

  // addCheckA() {
  //   if (this.relationList.length > 0) {
  //     this.relationList.map((el: any) => {
  //       el.selected = false;
  //       el.bgcolor = '#EDF1F7';
  //       el.color = '#000';
  //     });
  //   }
  // }

  // addCheckB() {
  //   if (this.randomList.length > 0) {
  //     this.randomList.map((el: any) => {
  //       el.selected = false;
  //       el.bgcolor = '#EDF1F7';
  //       el.color = '#000';
  //       el.padre = null;
  //     });
  //   }
  // }

  // revisarCheckA(item: any, i: any) {
  //   if (!item.selected) {
  //     item.selected = true;
  //     item.bgcolor = this.randomListColor[i];
  //     item.color = '#fff';
  //     this.form.get('itemA').setValue(item);
  //   } else {
  //     this.randomList.map((el: any) => {
  //       if (el.padre !== null) {
  //         if (el.padre.id === item.id) {
  //           el.selected = false;
  //           el.color = '#000';
  //           el.bgcolor = '#EDF1F7';
  //           el.padre = null;
  //           this.form.get('itemA').setValue(null);
  //         } else {
  //           item.selected = false;
  //           item.bgcolor = '#EDF1F7';
  //           item.color = '#000';
  //           this.form.get('itemA').setValue(null);
  //         }
  //       } else {
  //         item.selected = false;
  //         item.bgcolor = '#EDF1F7';
  //         item.color = '#000';
  //         this.form.get('itemA').setValue(null);
  //       }
  //     });
  //   }
  // }

  // revisarCheckB(item: any, i: any) {
  //   if (!item.selected && this.form.get('itemA').value !== null) {
  //     item.padre = this.form.get('itemA').value;
  //     if (item.padre !== null) {
  //       item.selected = item.padre.selected;
  //       item.color = item.padre.color;
  //       item.bgcolor = item.padre.bgcolor;
  //       this.form.get('itemA').setValue(null);
  //     } else {
  //       item.selected = false;
  //       item.color = '#000';
  //       item.bgcolor = '#EDF1F7';
  //     }
  //   } else {
  //     item.selected = false;
  //     item.color = '#000';
  //     item.bgcolor = '#EDF1F7';
  //     item.padre.color = '#000';
  //     item.padre.bgcolor = '#EDF1F7';
  //     item.padre.selected = false;
  //     item.padre = null;
  //   }
  // }

  // style(item: any) {
  //   return {
  //     'background-color': item.bgcolor,
  //     color: item.color,
  //   };
  // }

  imgStyleDef() {
    return {
      'background-color': '#EDF1F7',
      'border-radius': 'var(--border-radius)',
      overflow: 'hidden',
    };
  }

  imgStyle(item: any) {
    return {
      'background-color': item.bgcolor,
      'border-radius': 'var(--border-radius)',
      overflow: 'hidden',
    };
  }
  saveResponse() {
    const arrayA = JSON.parse(JSON.stringify(this.relationList));
    const arrayB = JSON.parse(JSON.stringify(this.secondList));
    console.log(arrayA, arrayB);

    const response:any = [];
    arrayA.map((r:any) => {
      if (r.checked) {
        const item = {
          id: r.id,
          id_question_relations: r.id_question_relations || null,
          relations_answers_studnet: r.relations_answers_studnet || null,
        };
        response.push(item);
      }
    });
    this.saveValues.emit(response);
  }
}
