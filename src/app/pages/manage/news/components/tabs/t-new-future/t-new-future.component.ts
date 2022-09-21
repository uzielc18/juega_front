import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-t-new-future',
  templateUrl: './t-new-future.component.html',
  styleUrls: ['./t-new-future.component.scss']
})
export class TNewFutureComponent implements OnInit, OnDestroy {

  listNewsFuture: any = [];
  @Input() events: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() clickGetFileItem: EventEmitter<any> = new EventEmitter();
  @Output() clickDeleteNews: EventEmitter<any> = new EventEmitter();
  @Output() clickGetPostNews: EventEmitter<any> = new EventEmitter();
  eventsSubscription: any = Subscription;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getNewsFuture();
    this.eventsSubscription = this.events.subscribe(() => this.getNewsFuture())
  }
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }
  getNewsFuture() {
    const serviceName = END_POINTS.base_back.news + '/news';
    const params = {
      publicar: false,
      futures: 1
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
      this.listNewsFuture = res.data || [];
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
