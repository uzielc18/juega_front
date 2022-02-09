import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-relation',
  templateUrl: './v-relation.component.html',
  styleUrls: ['./v-relation.component.scss']
})
export class VRelationComponent implements OnInit {

  randomList: any[] = [];

  relationList: any[] = [
    {
      relacion: 'Lima',
      relacionImg: 'https://www.vmlyr.com/sites/www/files/2020-01/AdobeStock_295560273-Lima-C_0.jpg',
      resp: 'Peru',
      respImg: 'peru.jpg',
      puntos: 2,
      correcto: 0
    },
    {
      relacion: 'Quito',
      relacionImg: 'https://www.efetur.com/files/2018/10/Quito-moderno-1.jpg',
      resp: 'Ecuador',
      respImg: 'ecuador.jpg',
      puntos: 3,
      correcto: 0
    },
    {
      relacion: 'Montevideo',
      relacionImg: 'https://aldianews.com/sites/default/files/articles/montevideo_grande.jpg',
      resp: 'Uruguay',
      respImg: 'uruguay.jpg',
      puntos: 3,
      correcto: 0
    }
  ]

  secondList: any[] = [
    {
      relacion: 'Peru',
      relacionImg: 'https://i.natgeofe.com/k/04ff1ab5-b28f-433a-ad99-4225c8966859/peru-flag_4x3.gif',
      puntos: 2,
      correcto: 0
    },
    {
      relacion: 'Ecuador',
      relacionImg: 'https://cdn11.bigcommerce.com/s-ey7tq/images/stencil/1280x1280/products/3199/18856/ecuador-flag__16789.1639690365.jpg?c=2',
      puntos: 3,
      correcto: 0
    },
    {
      relacion: 'Uruguay',
      relacionImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7LFhcwG4fGW1q-fiM0ZIQGQOfGk8Qz4Zf65QeWnOJzPk78I4-xxfHn0k67E0WKAhsgbs',
      puntos: 3,
      correcto: 0
    }
  ]

  // colors = [
  //   '#BB6464',
  //   '#54BAB9',
  //   '#655D8A',
  //   '#D885A3',
  //   '#28666E',
  //   '#EB5E55',
  //   '#033F63',
  // ]

  constructor() { }

  ngOnInit(): void {
    this.getShuffledArr(this.secondList);
  }

  getShuffledArr(arr: any) {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    this.randomList = newArr;
  };

  addCheck() {
    if (this.secondList.length > 0) {
      this.secondList.map((el: any) => {
        el.check = false;
      });
    }
  }

  revisarCheck(item: any) {
    if (!item.check) {
      this.addCheck();
      item.check = true;
    } else {
      item.check = false;
    }
  }

  setValue(item: any, i: any) {
    console.log(item, i);
  }

  value(item: any, i: any) {
    this.revisarCheck(item);
    console.log(item);
  }
}
