import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  userInfo: any;
  constructor(private userService: AppService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  getUserInfo() {
    this.userInfo = this.userService;
    // console.log(this.userInfo);
    
  }
}
