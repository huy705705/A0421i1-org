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
  private name:String = '';
  searchForm: FormGroup;
  userInput = new FormControl();
  // name = new FormControl('');
  registerForm: FormGroup;
  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder){
  }
  ngOnInit(): void {
    this.findAllPageable()
    // this.searchForm = new FormGroup({newsName: new FormControl})
    this.registerForm = this.fb.group({
      email: [''],
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
findAllName(){
  this.newsService.findByName(this.name).subscribe(
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
setPage(i: number, event: any) {
  event.preventDefault();
  this.page= i;
  this.findAllPageable();
}
setName(name: String, event: any) {
  event.preventDefault();
  this.name= name;
  this.findAllPageable();
}
onSubmit() {
  console.log(this.registerForm);
}
}
