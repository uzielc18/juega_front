import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/core';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() profile: any;
  constructor(private userService: AppService, private generalService: GeneralService) {}

  ngOnInit(): void {}
}
