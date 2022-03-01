import { Component, Input, OnInit } from "@angular/core";

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
  pares: any[] = [];
  tempPos: any = null;

  constructor() {}

  ngOnChanges(): void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;
    // this.addOrder();
    this.addCheck();
    this.getShuffledColor(this.colors);
    this.getShuffledArr(this.secondList);
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
    console.log(this.randomListColor, "randomListColor");
  }

  addOrder() {
    if (this.secondList.length > 0) {
      this.secondList.map((el: any, i: any) => {
        el.order = i;
      });
    }
  }

  addCheck() {
    if (this.secondList.length > 0 && this.relationList.length > 0) {
      this.secondList.map((el: any) => {
        el.selected = false;
        el.bgcolor = "#EDF1F7";
        el.color = "#000";
      });
      this.relationList.map((el: any) => {
        el.selected = false;
        el.bgcolor = "#EDF1F7";
        el.color = "#000";
      });
    }
  }

  revisarCheckA(item: any, i: any) {
    this.tempPos = null;
    if (!item.selected) {
      item.selected = true;
      item.bgcolor = this.randomListColor[i];
      item.color = "#fff";
      this.tempPos = i;
      this.pares[i] = new Object();
      this.pares[i].first_item = item;
    } else {
      item.selected = false;
      item.bgcolor = "#EDF1F7";
      item.color = "#000";
    }
    console.log(this.pares, "aaaaaaaaa :v/");
  }

  revisarCheckB(item: any, i: any) {
    if (this.tempPos !== null && !item.selected) {
      item.selected = true;
      item.bgcolor = this.randomListColor[this.tempPos];
      item.color = "#fff";
      this.pares[this.tempPos].second_item = item;
      this.tempPos = null;
    } else {
      item.selected = false;
      item.bgcolor = "#EDF1F7";
      item.color = "#000";
      // this.pares[this.tempPos].second_item = {};
      // console.log(this.tempPos, "tempPos");
      // this.pares[this.tempPos]["second_item"] = 0;
      // this.pares.splice(this.tempPos, 1);
      this.tempPos = null;
    }
    console.log(this.pares, "bbbbbbbbb o.O");
  }

  style(item: any) {
    return {
      "background-color": item.bgcolor,
      color: item.color,
    };
  }

  imgStyleDef() {
    return {
      "background-color": "#fff",
    };
  }

  imgStyle(item: any) {
    return {
      "padding-bottom": "20px",
      "background-color": item.bgcolor,
      "border-radius": "0.25rem",
      overflow: "hidden",
    };
  }
}
