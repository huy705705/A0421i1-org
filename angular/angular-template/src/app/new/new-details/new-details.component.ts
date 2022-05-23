import { Component, OnInit , Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.css']
})
export class NewDetailsComponent implements OnInit, OnChanges {

	@Input() childMessage: string;
  news:any;
  @Output() backList = new EventEmitter();
  constructor(private newsService: NewsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.showDetail(this.childMessage)
    
    
  }

  ngOnInit() {
    // console.log(this.childMessage);
    // this.showDetail(this.childMessage)
    
  }
  showDetail(id){
    this.newsService.showDetailNews(id).subscribe(
      data=>{
        this.news=data
        console.log(data);
        window.scrollTo({ top: 200, behavior: 'smooth' });
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  backListViews() {
    this.backList.emit();
    // Hàm vote sẽ tăng counter lên 1, đồng thời thông qua EventEmitter bắn value counter này ra component cha
  }
}
