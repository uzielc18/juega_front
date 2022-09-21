import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-t-new-active',
  templateUrl: './t-new-active.component.html',
  styleUrls: ['./t-new-active.component.scss']
})
export class TNewActiveComponent implements OnInit, OnDestroy {

  listNews:any = [];
  @Input() events: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() clickGetFileItem: EventEmitter<any> = new EventEmitter();
  @Output() clickDeleteNews: EventEmitter<any> = new EventEmitter();
  eventsSubscription: any = Subscription;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getNews();
    this.eventsSubscription = this.events.subscribe(() => this.getNews());
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  getNews() {
    const serviceName = END_POINTS.base_back.news + '/news';
    const params = {
      publicar: 1,
      activo: 1
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
      this.listNews = res.data || [];
    }, () => {this.loadingsForm.emit(false)}, ()=> {this.loadingsForm.emit(false)});
  }
  getFileItem(item: any){
    this.clickGetFileItem.emit(item);
  }
  deleteNews(item: any){
    this.clickDeleteNews.emit(item);
  }

}
