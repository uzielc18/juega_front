import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound-home',
  templateUrl: './notfound-home.component.html',
  styleUrls: ['./notfound-home.component.scss']
})
export class NotfoundHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    this.router.navigate(['/pages/dashboard']);
  }
}
