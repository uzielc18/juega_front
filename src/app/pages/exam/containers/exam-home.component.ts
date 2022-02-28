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
        imagen: null,
      },
      {
        id: 121,
        relacion: "down",
        imagen: null,
      },
      {
        id: 123,
        relacion: "low",
        imagen: null,
      },
      {
        id: 125,
        relacion: "light",
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
        relacion: "fast",
        imagen: null,
      },
      {
        id: 126,
        relacion: "dark",
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
