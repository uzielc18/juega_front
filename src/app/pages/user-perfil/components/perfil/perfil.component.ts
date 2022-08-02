import {Component, Input, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() profile:any;

  loading: boolean = false

  constructor( private generalService: GeneralService,) { }

  ngOnInit(): void {
  }
}
