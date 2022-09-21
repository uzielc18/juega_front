import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {END_POINTS} from "../../../../../../providers/utils";
import {GeneralService} from "../../../../../../providers";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-t-new-past',
  templateUrl: './t-new-past.component.html',
  styleUrls: ['./t-new-past.component.scss']
})
export class TNewPastComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  listNewsPast: any = [];
  @Input() events: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() clickGetFileItem: EventEmitter<any> = new EventEmitter();
  @Output() clickDeleteNews: EventEmitter<any> = new EventEmitter();
  @Output() clickGetPostNews: EventEmitter<any> = new EventEmitter();
  eventsSubscription: any = Subscription;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getNewsPast();
    this.eventsSubscription = this.events.subscribe(() => this.getNewsPast());
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  getNewsPast() {
    const serviceName = END_POINTS.base_back.news + '/news';
    const params = {
      pasadas: 1
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
      this.listNewsPast = res.data || [];
    }, () => {this.loadingsForm.emit(false)}, ()=> {this.loadingsForm.emit(false)});
  }
  getFileItem(item: any){
    this.clickGetFileItem.emit(item);
  }
  postNews(item: any){
    this.clickGetPostNews.emit(item);
  }
  deleteNews(item: any){
    this.clickDeleteNews.emit(item);
  }
}
