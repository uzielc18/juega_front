import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exam-home",
  templateUrl: "./exam-home.component.html",
  styleUrls: ["./exam-home.component.scss"],
})
export class ExamHomeComponent implements OnInit {
  collapsed: boolean = false;
  loading: boolean = false;
  textImg = [
    {
      nombre: "Comprensivo",
      id: 1,
      selected: 0,
      checked: false,
      adjunto: "https://imagenes.20minutos.es/files/article_amp/uploads/imagenes/2022/01/12/vaca.jpeg",
    },
    {
      nombre: "Pasivo",
      id: 2,
      selected: 0,
      checked: false,
      adjunto: "https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720_1280.jpg",
    },
    {
      nombre: "Sentimental",
      id: 3,
      selected: 0,
      checked: false,
      adjunto: "https://definicion.de/wp-content/uploads/2015/02/ganado.jpg",
    },
    {
      nombre: "Dinámico",
      id: 4,
      selected: 0,
      checked: false,
      adjunto: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/04/26/60868c00d04fc.jpeg",
    },
    {
      nombre: "Adaptativo",
      id: 5,
      selected: 0,
      checked: false,
      adjunto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MjEcbf2UEaJlkunkvFYf3Xm6d61Gcabluw&usqp=CAU",
    },
  ];
  images = [
    {
      nombre: "",
      id: 1,
      selected: 0,
      checked: false,
      adjunto: "https://imagenes.20minutos.es/files/article_amp/uploads/imagenes/2022/01/12/vaca.jpeg",
    },
    {
      nombre: "",
      id: 2,
      selected: 0,
      checked: false,
      adjunto: "https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720_1280.jpg",
    },
    {
      nombre: "",
      id: 3,
      selected: 0,
      checked: false,
      adjunto: "https://definicion.de/wp-content/uploads/2015/02/ganado.jpg",
    },
    {
      nombre: "",
      id: 4,
      selected: 0,
      checked: false,
      adjunto: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/04/26/60868c00d04fc.jpeg",
    },
    {
      nombre: "",
      id: 5,
      selected: 0,
      checked: false,
      adjunto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MjEcbf2UEaJlkunkvFYf3Xm6d61Gcabluw&usqp=CAU",
    },
  ];
  texts = [
    {
      nombre: "Comprensivo",
      id: 1,
      selected: 0,
      checked: false,
      adjunto: "",
    },
    {
      nombre: "Pasivo",
      id: 2,
      selected: 0,
      checked: false,
      adjunto: "",
    },
    {
      nombre: "Sentimental",
      id: 3,
      selected: 0,
      checked: false,
      adjunto: "",
    },
    {
      nombre: "Dinámico",
      id: 4,
      selected: 0,
      checked: false,
      adjunto: "",
    },
    {
      nombre: "Adaptativo",
      id: 5,
      selected: 0,
      checked: false,
      adjunto: "",
    },
  ];

  relation = {
    arrayA: [
      {
        id: 119,
        relacion: "happy",
        imagen: "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
      },
      {
        id: 121,
        relacion: "down",
        imagen: "https://www.pngitem.com/pimgs/m/71-715425_down-arrow-png-transparent-icon-transparent-arrow-down.png",
      },
      {
        id: 123,
        relacion: "day",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvz-l_AQzoRZ7wihLlDZBE-uEw3KqgydDc_WRA5yVi4ja1j8KsXu7JOJ3hdxywT4DxtM&usqp=CAU",
      },
      {
        id: 125,
        relacion: "kid",
        imagen: "https://en.pimg.jp/040/904/171/1/40904171.jpg",
      },
    ],
    arrayB: [
      {
        id: 120,
        relacion: "sad",
        imagen: "https://whatemoji.org/wp-content/uploads/2020/07/Frowning-Face-Emoji-1024x1024.png",
      },
      {
        id: 122,
        relacion: "up",
        imagen: "https://www.pngitem.com/pimgs/m/512-5126598_transparent-arrow-pointing-up-png-png-download.png",
      },
      {
        id: 124,
        relacion: "night",
        imagen:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg/640px-%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg",
      },
      {
        id: 126,
        relacion: "old",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT02-1XKSVkVIGKmyI9CDt9IvSgkJFIxI2DSxJsBV4CBX2f6Se9f80fne861jV3kO5awvE&usqp=CAU",
      },
    ],
  };

  relationText = {
    arrayA: [
      {
        id: 119,
        relacion: "happy",
        imagen: null,
      },
      {
        id: 121,
        relacion: "down",
        imagen: null,
      },
      {
        id: 123,
        relacion: "day",
        imagen: null,
      },
      {
        id: 125,
        relacion: "kid",
        imagen: null,
      },
    ],
    arrayB: [
      {
        id: 120,
        relacion: "sad",
        imagen: null,
      },
      {
        id: 122,
        relacion: "up",
        imagen: null,
      },
      {
        id: 124,
        relacion: "night",
        imagen: null,
      },
      {
        id: 126,
        relacion: "old",
        imagen: null,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  collapse() {
    this.collapsed = !this.collapsed;
  }

  loadingsFiles($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }
}
