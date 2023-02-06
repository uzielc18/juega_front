import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-enrollment-canva',
  templateUrl: './m-enrollment-canva.component.html',
  styleUrls: ['./m-enrollment-canva.component.scss']
})
export class MEnrollmentCanvaComponent implements OnInit {

  @Input() formHeader: any;
  constructor(private generalService: GeneralService,
              public activeModal: NbDialogRef<MEnrollmentCanvaComponent>,) { }

  ngOnInit(): void {
  }

}
