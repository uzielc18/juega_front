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
    "#222831",
    "#E39800",
    "#2BADD3",
    "#F6ACC8",
    "#246C75",
    "#94124E",
    "#F1D00A",
    "#002885",
  ];

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
    this.addOrder();
    this.addCheck();
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
      item.bgcolor = this.colors[i];
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
      item.bgcolor = this.colors[this.tempPos];
      item.color = "#fff";
      this.pares[this.tempPos].second_item = item;
      this.tempPos = null;
    } else {
      item.selected = false;
      item.bgcolor = "#EDF1F7";
      item.color = "#000";
      this.tempPos = null;
    }
    console.log(this.pares, "bbbbbbbbb O.o");
  }

  style(item: any) {
    return {
      "background-color": item.bgcolor,
      color: item.color,
    };
  }

  imgStyle(item: any) {
    return {
      padding: "5px",
      "background-color": item.bgcolor,
    };
  }
}
