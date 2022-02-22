import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-v-zoom-validate',
  templateUrl: './v-zoom-validate.component.html',
  styleUrls: ['./v-zoom-validate.component.scss']
})
export class VZoomValidateComponent implements OnInit {
  code:any;
  loading: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private generalServi: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params:any) => {
        // console.log(params);
        this.code = params && params.params && params.params.code || '';
        setTimeout(() => {
          this.zoom();
        }, 3000);
      // this.code = { ...params.keys, ...params };1
    });
  }
  zoom() {
    const serviceName = 'zoom';
    this.loading = true;
    const params:any = {
      code: this.code || '',
    };
    if (this.code) {
      this.generalServi.nameParams$(serviceName, params).subscribe((re:any) => {
        if (re.success) {
          this.router.navigate([`/pages/manage/zoom`]);
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
}
