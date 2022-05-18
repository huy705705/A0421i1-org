import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {Router} from '@angular/router';
import {News} from '../../model/news';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import { formatDate } from '@angular/common';
import { Chart, registerables } from 'chart.js';
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
  newsListMarquee : String = '';
  private nameMarquee:String = '';
  pageTotalView:number= 0;
  newsPageTotalView:Array<any>;
  pageSearch: number = 0;
  pageSearchTotal: number = 0;
  newsPageSearch:Array<any>;
  pagesSearch:Array<number>;
  pagesSearchEmpty: boolean = false;
  today= new Date();
  jstoday = '';
  searchButton: boolean = true;
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  newsTypeStatisticalData: any = [];
  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder, private toastr: ToastrService,){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.findAllPageable()
    this.findAllPageableHl()
    this.findAllByTotalView()
    // this.statisticalTotalViewsByType()
    this.searchForm = this.fb.group({
      nameInput: [''],
    });
    setInterval(() => {
      this.today = new Date();
    }, 1);
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          // labels: ['Tin Tức Chăn Nuôi', 'Tạp Chí', 'Luật Chăn Nuôi', 'Thị Trường', 'Bí Kíp Chăn Nuôi'],
          labels: [] = [],
          datasets: [{
            label: '# of Total Messages',
            data: [] = [], // <== note this part, the initialization
              // data: this.setDataStatical,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
    // this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }
  findAllPageable(){
    this.newsService.findAllPageable(this.page).subscribe(
      data=>{
        this.newsPage=data['content']
        console.log(data);
        this.newsPage.forEach(element => {
          this.newsListMarquee +=  " | " + element.newsName + " | ";
        });
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
    console.log(this.searchButton);
    
    if (this.searchButton) {
      this.pageSearch = 0;
    }
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          console.log(this.pageSearch);
          
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
  // statisticalTotalViewsByType(){
  //   this.newsService.statisticalTotalViewsByType().subscribe(
  //     data=>{
  //       console.log(data['content']);
        
  //       data['content'].forEach(element => {
  //         this.newsTypeStatisticalData.push(element.totalViews)
  //       });
  //       this.addData(Chart,this.newsTypeStatisticalData, ["1", "2" , "3" , "4" , "5"] )
  //       console.log(this.newsTypeStatisticalData);
        
  //     },
  //     (error) => {
  //       console.log(error.error.message);
  //     }
  //   )
  // }
  addData(chart, 
        labels_builds = [], // See comment below
        labels_data = [] // added this as an alternative null check for your server data.
){
     chart.data.labels = [
        ...chart.data.labels, // Check the ES6 spread operator, you'll like it.
        ...labels_builds      // In essence in this case it means "every element of"
     ];
     chart.data.datasets.data = [
        ...chart.data.datasets.data,
        ...labels_data
     ];
     chart.update();
 }
  setDataStatical(){
    this.newsService.statisticalTotalViewsByType().subscribe(
      data=>{
        console.log(data['content']);
        
        data['content'].forEach(element => {
          this.newsTypeStatisticalData.push(element.totalViews)
        });
        console.log(this.newsTypeStatisticalData);
        
        return this.newsTypeStatisticalData
        
      },
      (error) => {
        return this.newsTypeStatisticalData
      }
    )
  }
  showDetail(id){
    console.log(id);
    this.newsService.showDetailNews(id).subscribe(
      data=>{
        // this.newsPageTotalView=data['content']
        console.log(data['content']);
        
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
  setPageHL(i: number , event: any) {
    event.preventDefault();
    this.pageHl = i;
    this.findAllPageableHl();
    console.log(this.pageHl );
  }
  setSearch(i: number , event: any) {
    this.searchButton = false;
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
    this.searchButton = true;
    this.name= this.searchForm.value.nameInput;
    this.findAllName()
    this.searchForm.reset()
    console.log(this.searchForm.value.nameInput);
  }
  sortByDesc(event: any){
    console.log("mới nhất");
    
    this.newsService.findByNameDesc(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
  sortByAsc(){
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
  sortByViews(){
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
  onEditClick(type: any) {
    console.log('skill name', type);
    switch (type) {
      case "desc":
    
        this.newsService.findByNameDesc(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
        break;
      case "asc":
        this.newsService.findByNameAsc(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
        break;
      case "views":
        this.newsService.findByNameTotalView(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
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
        break;
      default:
        break;
    }
}

}
