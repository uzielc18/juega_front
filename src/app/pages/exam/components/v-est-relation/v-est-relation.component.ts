import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-v-est-relation',
  templateUrl: './v-est-relation.component.html',
  styleUrls: ['./v-est-relation.component.scss'],
})
export class VEstRelationComponent implements OnInit {
  @Input() alternativas: any = [];
  @Output() saveValues = new EventEmitter<any>();

  form: any = FormGroup;

  colors: any = [
    '#1AAE9F',
    '#D3455B',
    '#5D1787',
    '#E39800',
    '#2BADD3',
    '#F6ACC8',
    '#246C75',
    '#94124E',
    '#F1D00A',
    '#002885',
  ];
  randomListColor: any = [];
  relationList: any[] = [];
  secondList: any[] = [];
  randomList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;
    this.getShuffledColor(this.colors);
    this.getShuffledArr(this.secondList);
    this.addCheckA();
    this.addCheckB();
  }

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      itemA: [null, [Validators.required]],
      itemB: [null, [Validators.required]],
    };
    this.form = this.fb.group(controls);
  }

  getShuffledArr(arr: any) {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    this.randomList = newArr;
  }

  getShuffledColor(arr: any) {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    this.randomListColor = newArr;
  }

  addCheckA() {
    if (this.relationList.length > 0) {
      this.relationList.map((el: any) => {
        el.selected = false;
        el.bgcolor = '#EDF1F7';
        el.color = '#000';
      });
    }
  }

  addCheckB() {
    if (this.randomList.length > 0) {
      this.randomList.map((el: any) => {
        el.selected = false;
        el.bgcolor = '#EDF1F7';
        el.color = '#000';
        el.padre = null;
      });
    }
  }

  revisarCheckA(item: any, i: any) {
    if (!item.selected) {
      item.selected = true;
      item.bgcolor = this.randomListColor[i];
      item.color = '#fff';
      this.form.get('itemA').setValue(item);
    } else {
      this.randomList.map((el: any) => {
        if (el.padre !== null) {
          if (el.padre.id === item.id) {
            el.selected = false;
            el.color = '#000';
            el.bgcolor = '#EDF1F7';
            el.padre = null;
            this.form.get('itemA').setValue(null);
          } else {
            item.selected = false;
            item.bgcolor = '#EDF1F7';
            item.color = '#000';
            this.form.get('itemA').setValue(null);
          }
        } else {
          item.selected = false;
          item.bgcolor = '#EDF1F7';
          item.color = '#000';
          this.form.get('itemA').setValue(null);
        }
      });
    }
  }

  revisarCheckB(item: any, i: any) {
    if (!item.selected && this.form.get('itemA').value !== null) {
      item.padre = this.form.get('itemA').value;
      if (item.padre !== null) {
        item.selected = item.padre.selected;
        item.color = item.padre.color;
        item.bgcolor = item.padre.bgcolor;
        this.form.get('itemA').setValue(null);
      } else {
        item.selected = false;
        item.color = '#000';
        item.bgcolor = '#EDF1F7';
      }
    } else {
      item.selected = false;
      item.color = '#000';
      item.bgcolor = '#EDF1F7';
      item.padre.color = '#000';
      item.padre.bgcolor = '#EDF1F7';
      item.padre.selected = false;
      item.padre = null;
    }
  }

  style(item: any) {
    return {
      'background-color': item.bgcolor,
      color: item.color,
    };
  }

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
    console.log(arrayB);
    
    // const response:any = [];
    // array.map((r:any) => {
    //   if (r.checked) {
    //     const item = {
    //       id: r.id,
    //       // pregunta_id: r.pregunta_id
    //     };
    //     response.push(item);
    //   }
    // });
    // this.saveValues.emit(response);
  }
}
