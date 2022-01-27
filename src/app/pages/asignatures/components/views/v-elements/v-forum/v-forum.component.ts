import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  text = new FormControl('');
  comentarios: string[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  insertComments() {
    this.comentarios.push(this.text.value);
    this.text.reset();
  }
}
