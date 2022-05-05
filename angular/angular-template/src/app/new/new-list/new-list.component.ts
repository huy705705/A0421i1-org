import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {Router} from '@angular/router';
import {News} from '../../model/news';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  page:number= 0;
  pageTotal:number=0;
  newsPage:Array<any>;
  pages:Array<number>;
  pageHl:number= 0;
  pageHlTotal:number= 0;
  newsPageHl:Array<any>;
  pagesHL:Array<number>;
  searchForm: FormGroup;
  newsListM : String = '';
  private name:String = '';
  pageTotalView:number= 0;
  newsPageTotalView:Array<any>;
  pageSearch: number = 0;
  pageSearchTotal: number = 0;
  newsPageSearch:Array<any>;
  pagesSearch:Array<number>;
  pagesSearchEmpty: boolean = false;
  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder, private toastr: ToastrService,){
  }
  ngOnInit(): void {
    this.findAllPageable()
    this.findAllPageableHl()
    this.findAllByTotalView()
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
        this.pageTotal = data['totalPages']
        console.log(this.pageTotal);
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
        this.newsPageHl.forEach(element => {
          this.newsListM +=  " | " + element.newsName + " | ";
        });
        console.log(this.newsListM);
        this.pagesHL=new Array(data['totalPages'])
        this.pageHlTotal = data['totalPages']
        // console.log(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  findAllByTotalView(){
    this.newsService.findByTotalView(this.pageHl).subscribe(
      data=>{
        this.newsPageTotalView=data['content']
        console.log(data['content']);
        
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  findAllName(){
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy têb bài viết", {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
          return
        }else{
          this.newsPageSearch=data['content']
          console.log(data);
          this.pagesSearch=new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];
          this.pagesSearchEmpty = true;
          console.log(data['totalPages']);
        }

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
  setSearch(i: number , event: any) {
    event.preventDefault();
    this.pageSearch = i;
    this.findAllName();
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
    this.searchForm.reset()
    console.log(this.searchForm.value.nameInput);
  }
}
