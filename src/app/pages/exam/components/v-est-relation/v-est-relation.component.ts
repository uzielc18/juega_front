import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-v-est-relation",
  templateUrl: "./v-est-relation.component.html",
  styleUrls: ["./v-est-relation.component.scss"],
})
export class VEstRelationComponent implements OnInit {
  @Input() alternativas: any = [];

  colors: any = [
    "#62257C",
    "#DE4A5D",
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
  tempPos: any;

  constructor() {}

  ngOnChanges(): void {
    this.alternativas = this.alternativas;
    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;
    this.addOrder();
    this.addCheck();
    this.getShuffledArr(this.secondList);
  }
  // this.addOrder()

  ngOnInit(): void {}

  // randomNoRepeats(array: any) {
  //   let copy = array.slice(0);
  //   return function () {
  //     if (copy.length < 1) { copy = array.slice(0); }
  //     let index = Math.floor(Math.random() * copy.length);
  //     let item = copy[index];
  //     copy.splice(index, 1);
  //     return item;
  //   };
  // }

  // getRandomColor() {
  //   return {
  //     'background-color': this.randomNoRepeats(this.colors)
  //   }
  // }

  color(i: any) {
    return {
      "background-color": this.colors[i],
    };
  }

  // defColor() {
  // return {
  // 'background-color': '#fff',
  // }
  // }

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
    if (this.secondList.length > 0) {
      this.secondList.map((el: any) => {
        el.selected = false;
      });
    }
  }

  revisarCheckA(item: any, i: any) {
    this.tempPos = 0;
    if (!item.selected) {
      this.addCheck();
      item.selected = true;
      this.tempPos = i;
      this.pares[i]["first_item"] = item;
    } else {
      item.selected = false;
    }
    console.log(item);
    console.log(this.pares, "hellooooo?");
  }

  revisarCheckB(item: any, i: any) {
    if (!item.selected) {
      this.addCheck();
      item.selected = true;
      this.pares[this.tempPos]["second_item"] = item;
      item.selected = false;
    }
    console.log(item);
    console.log(this.pares, "hellooooo?");
  }

  setValue(item: any, i: any) {
    // console.log(item);
  }

  value(item: any, i: any) {
    // console.log(item);
  }
}
