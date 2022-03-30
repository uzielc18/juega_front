import { Component, Input, OnInit } from "@angular/core";
import { el } from "date-fns/locale";

@Component({
  selector: "app-v-est-relation",
  templateUrl: "./v-est-relation.component.html",
  styleUrls: ["./v-est-relation.component.scss"],
})
export class VEstRelationComponent implements OnInit {
  @Input() alternativas: any = [];

  colors: any = [
    "#1AAE9F",
    "#D3455B",
    "#5D1787",
    "#E39800",
    "#2BADD3",
    "#F6ACC8",
    "#246C75",
    "#94124E",
    "#F1D00A",
    "#002885",
  ];
  randomListColor: any = [];
  relationList: any[] = [];
  secondList: any[] = [];
  randomList: any[] = [];
  currentA: any = null;
  currentB: any = null;
  pares: any[] = [];
  tempPos: any = null;

  constructor() {}

  ngOnChanges(): void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;
    this.getShuffledColor(this.colors);
    this.getShuffledArr(this.secondList);
    this.addCheckA();
    this.addCheckB();
  }

  ngOnInit(): void {}

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
        el.bgcolor = "#EDF1F7";
        el.color = "#000";
      });
    }
  }

  addCheckB() {
    if (this.randomList.length > 0) {
      this.randomList.map((el: any) => {
        el.selected = false;
        el.bgcolor = "#EDF1F7";
        el.color = "#000";
        el.padre = null;
      });
    }
  }

  revisarCheckA(item: any, i: any) {
    if (!item.selected) {
      item.selected = true;
      item.bgcolor = this.randomListColor[i];
      item.color = "#fff";
      this.currentA = item;
    } else {
      this.randomList.map((el: any) => {
        if (el.padre !== null) {
          if (el.padre.id === item.id) {
            el.selected = false;
            el.color = "#000";
            el.bgcolor = "#EDF1F7";
            el.padre = null;
            this.currentA = null;
          } else {
            item.selected = false;
            item.bgcolor = "#EDF1F7";
            item.color = "#000";
            this.currentA = null;
          }
        } else {
          item.selected = false;
          item.bgcolor = "#EDF1F7";
          item.color = "#000";
          this.currentA = null;
        }
      });
    }
  }

  revisarCheckB(item: any, i: any) {
    if (!item.selected) {
      item.padre = this.currentA;
      if (item.padre !== null) {
        item.selected = item.padre.selected;
        item.color = item.padre.color;
        item.bgcolor = item.padre.bgcolor;
        this.currentA = null;
      } else {
        item.selected = false;
        item.color = "#000";
        item.bgcolor = "#EDF1F7";
      }
    } else {
      item.selected = false;
      item.color = "#000";
      item.bgcolor = "#EDF1F7";
      item.padre.color = "#000";
      item.padre.bgcolor = "#EDF1F7";
      item.padre.selected = false;
      item.padre = null;
    }
  }

  style(item: any) {
    return {
      "background-color": item.bgcolor,
      color: item.color,
    };
  }

  imgStyleDef() {
    return {
      "background-color": "#EDF1F7",
      "border-radius": "var(--border-radius)",
      overflow: "hidden",
    };
  }

  imgStyle(item: any) {
    return {
      "background-color": item.bgcolor,
      "border-radius": "var(--border-radius)",
      overflow: "hidden",
    };
  }
}
