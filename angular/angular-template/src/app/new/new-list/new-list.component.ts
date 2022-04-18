import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {Router} from '@angular/router';
import {News} from '../../model/news';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  private page:number= 0;
  newsPage:Array<any>;
  pages:Array<number>;
  private pageHl:number= 0;
  newsPageHl:Array<any>;
  pagesHL:Array<number>;

  searchForm: FormGroup;

  private name:String = '';
  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder){
  }
  ngOnInit(): void {
    this.findAllPageable()
    this.findAllPageableHl()
    this.searchForm = this.fb.group({
      nameInput: [''],
    });
}
findAllPageable(){
  this.newsService.findAllPageable(this.page).subscribe(
    data=>{
      this.newsPage=data['content']
      console.log(data);
      
      this.pages=new Array(data['totalPages'])
      console.log(data['totalPages']);
      
    },
    (error) => {
      console.log(error.error.message);
    }
  )

}
findAllPageableHl(){
  this.newsService.findAllHightLight(this.pageHl).subscribe(
    data=>{
      this.newsPageHl=data['content']
      console.log(data);
      
      this.pagesHL=new Array(data['totalPages'])
      // console.log(data['totalPages']);
      
    },
    (error) => {
      console.log(error.error.message);
    }
  )
}
findAllName(){
  this.newsService.findByName(this.name).subscribe(
    data=>{
      this.newsPage=data['content']
      console.log(data);
      
      this.pages=new Array(data['totalPages'])
      console.log(data['totalPages']);
      
    },
    (error) => {
      // this.newsPage=[]
      // this.pages = null
      console.log(error.error.message);
    }
  )
}
setPage(i: number, event: any) {
  event.preventDefault();
  this.page= i;
  this.findAllPageable();
}
setPageHL(i: number , event: any) {
  event.preventDefault();
  this.pageHl = i;
  this.findAllPageableHl();
  console.log(this.pageHl );
  
}
setName(name: String, event: any) {
  event.preventDefault();
  this.name= name;
  this.findAllPageable();
}
searchName(){
  console.log("hehe");
  
}
onSubmit() {
  this.name= this.searchForm.value.nameInput;
  this.findAllName()
  console.log(this.searchForm.value.nameInput);
}
}
