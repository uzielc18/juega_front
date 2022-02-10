import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-relation',
  templateUrl: './v-doc-relation.component.html',
  styleUrls: ['./v-doc-relation.component.scss']
})
export class VDocRelationComponent implements OnInit {

  randomList: any[] = [];

  relationList: any[] = [
    {
      relacion: 'Lima',
      imagen: 'https://www.vmlyr.com/sites/www/files/2020-01/AdobeStock_295560273-Lima-C_0.jpg',
      puntos: 2,
    },
    {
      relacion: 'Quito',
      imagen: 'https://www.efetur.com/files/2018/10/Quito-moderno-1.jpg',
      puntos: 3,
    },
    {
      relacion: 'Montevideo',
      imagen: 'https://aldianews.com/sites/default/files/articles/montevideo_grande.jpg',
      puntos: 3,
    }
  ]

  secondList: any[] = [
    {
      relacion: 'Peru',
      imagen: 'https://i.natgeofe.com/k/04ff1ab5-b28f-433a-ad99-4225c8966859/peru-flag_4x3.gif',
      puntos: 2,
    },
    {
      relacion: 'Ecuador',
      imagen: 'https://cdn11.bigcommerce.com/s-ey7tq/images/stencil/1280x1280/products/3199/18856/ecuador-flag__16789.1639690365.jpg?c=2',
      puntos: 3,
    },
    {
      relacion: 'Uruguay',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7LFhcwG4fGW1q-fiM0ZIQGQOfGk8Qz4Zf65QeWnOJzPk78I4-xxfHn0k67E0WKAhsgbs',
      puntos: 3,
    }
  ]

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

  setValue(item: any) {
    console.log(item);
  }

  value(item: any) {
    this.revisarCheck(item);
    console.log(item);
  }

}
