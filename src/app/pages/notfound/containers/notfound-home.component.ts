import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound-home',
  templateUrl: './notfound-home.component.html',
  styles: [
    `
      .back-button {
        background-color: transparent !important;

        &:hover {
          background-color: var(--color-primary-500) !important;
        }
      }

      .text-container {
        top: 12%;
        left: 47%;

        h1 {
          font-size: 128px;
        }

        h2 {
          font-size: 24px;
        }

        p {
          font-size: 18px;
          font-weight: 500;
        }
      }

      @media screen and (max-width: 768px) {
        .text-container {
          top: 10%;
          left: 6%;

          h1 {
            font-size: 104px;
          }

          h2 {
            font-size: 24px;
          }

          p {
            font-size: 18px;
            font-weight: 500;
          }
        }
      }

      @media screen and (max-width: 576px) {
        .text-container {
          top: 14%;
          left: 6%;

          h1 {
            font-size: 80px;
          }

          h2 {
            font-size: 20px;
          }

          p {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
    `,
  ],
})
export class NotfoundHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    this.router.navigate(['/pages/dashboard']);
  }
}
