import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-home',
  templateUrl: './activities-home.component.html',
  styleUrls: ['./activities-home.component.scss'],
})
export class ActivitiesHomeComponent implements OnInit {
  elements = [
    {
      id: 57,
      element_id: 0,
      course_id: 22,
      topic_id: 37,
      type_element_id: 1,
      evaluation_id: 0,
      id_carga_curso_docente: '127805',
      id_programa_estudio: 412,
      titulo: 'Trabajo prueba 10',
      descripcion: 'Nuevo trabajo',
      tipo: 'TRABAJO',
      orden: null,
      nota: '0',
      url_externa: null,
      documento_ayuda: null,
      tamano_peso: null,
      fecha_inicio: '2022-01-19 05:00:00',
      fecha_fin: '2022-01-19 06:00:00',
      fecha_gracia: '2022-01-19 00:00:00',
      grupal: '1',
      visibilidad: '1',
      intentos: '1',
      permitir_comentarios: null,
      calificable: '1',
      duracion: '180',
      total_pendientes: 4,
      total_vistos: 0,
      total_entregados: 0,
      total_revisados: 0,
      total_satisfaccion: 0,
      estado: '1',
      userid: 749,
      created_at: '2022-01-19 09:08:26',
      updated_at: '2022-01-19 09:08:28',
      deleted_at: null,
      files: [
        {
          id: 47,
          person_id: 749,
          nombre: '127805_200110121_30991.pdf',
          nombre_original: 'Cristo es la peña de Horeb.pdf',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_30991.pdf',
          tabla: 'elements',
          tabla_id: '57',
          peso: '333098',
          ext: 'pdf',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 09:08:26',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
        {
          id: 71,
          person_id: 749,
          nombre: '127805_200110121_40192.pdf',
          nombre_original: 'Cristo es la peña de Horeb.pdf',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_40192.pdf',
          tabla: 'elements',
          tabla_id: '57',
          peso: '333098',
          ext: 'pdf',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 17:15:59',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
        {
          id: 97,
          person_id: 749,
          nombre: '127805_200110121_22099.xlsx',
          nombre_original: 'Lista de participantes (14).xlsx',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_22099.xlsx',
          tabla: 'elements',
          tabla_id: '57',
          peso: '7802',
          ext: 'xlsx',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 17:51:44',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
      ],
      forums: null,
      type_element: {
        id: 1,
        nombre: 'TRABAJO',
        estado: '1',
        userid: 1,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        background: '#246C75',
        color_hover: '#246C75',
        color_active: '#FFFFFF',
        color_border: '#246C75',
        icono: 'list-outline',
        icono_font_size: null,
        codigo: 'TRAB',
      },
    },
    {
      id: 58,
      element_id: 0,
      course_id: 22,
      topic_id: 37,
      type_element_id: 1,
      evaluation_id: 0,
      id_carga_curso_docente: '127805',
      id_programa_estudio: 412,
      titulo: 'Trabajo prueba 10',
      descripcion: 'Nuevo trabajo',
      tipo: 'TRABAJO',
      orden: null,
      nota: '0',
      url_externa: null,
      documento_ayuda: null,
      tamano_peso: null,
      fecha_inicio: '2022-01-19 05:00:00',
      fecha_fin: '2022-01-19 06:00:00',
      fecha_gracia: '2022-01-19 00:00:00',
      grupal: '0',
      visibilidad: '1',
      intentos: '1',
      permitir_comentarios: null,
      calificable: '1',
      duracion: '180',
      total_pendientes: 4,
      total_vistos: 0,
      total_entregados: 0,
      total_revisados: 0,
      total_satisfaccion: 0,
      estado: '1',
      userid: 749,
      created_at: '2022-01-19 09:08:26',
      updated_at: '2022-01-19 09:08:28',
      deleted_at: null,
      files: [
        {
          id: 47,
          person_id: 749,
          nombre: '127805_200110121_30991.pdf',
          nombre_original: 'Cristo es la peña de Horeb.pdf',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_30991.pdf',
          tabla: 'elements',
          tabla_id: '57',
          peso: '333098',
          ext: 'pdf',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 09:08:26',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
        {
          id: 71,
          person_id: 749,
          nombre: '127805_200110121_40192.pdf',
          nombre_original: 'Cristo es la peña de Horeb.pdf',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_40192.pdf',
          tabla: 'elements',
          tabla_id: '57',
          peso: '333098',
          ext: 'pdf',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 17:15:59',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
        {
          id: 97,
          person_id: 749,
          nombre: '127805_200110121_22099.xlsx',
          nombre_original: 'Lista de participantes (14).xlsx',
          url: 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/plantillas/upeu/127805_200110121_22099.xlsx',
          tabla: 'elements',
          tabla_id: '57',
          peso: '7802',
          ext: 'xlsx',
          tipo: 'DOCUMENTO_AYUDA',
          estado: '1',
          userid: 749,
          created_at: '2022-01-19 17:51:44',
          updated_at: '2022-01-19 17:51:44',
          deleted_at: null,
        },
      ],
      forums: null,
      type_element: {
        id: 1,
        nombre: 'TRABAJO',
        estado: '1',
        userid: 1,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        background: '#246C75',
        color_hover: '#246C75',
        color_active: '#FFFFFF',
        color_border: '#246C75',
        icono: 'list-outline',
        icono_font_size: null,
        codigo: 'TRAB',
      },
    },
  ];

  selectedItem = '1';
  option = 'TODOS';
  tipo = 'VIDEOS';

  page = 1;
  pageSize = 4;
  collectionSize = this.elements.length;

  constructor() {
    this.refreshCountries();
  }

  ngOnInit(): void {}

  refreshCountries() {
    // this.elements.map((country, i) => ({
    //   id: i + 1,
    //   ...country,
    // })).slice(
    //   (this.page - 1) * this.pageSize,
    //   (this.page - 1) * this.pageSize + this.pageSize
    // );
  }

  iconStyle(element: any) {
    return {
      'background-color': element?.type_element?.background,
    };
  }
}
