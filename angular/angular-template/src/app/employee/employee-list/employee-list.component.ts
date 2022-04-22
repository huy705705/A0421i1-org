import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  private page:number= 0;
  employeePage:Array<any>;
  pages:Array<number>;
  currentPage:number;
  public searchName ="";
  public searchId   ="";
  isSubmitted=false;
  isTrue=false;
  isTrue2=true;


  constructor(private employeeService: EmployeeService, private router: Router){
  }

  ngOnInit(): void {
    this.findAllPageable();
    this.search();
    // this.employeeService.findAll().subscribe((data) => {
    //   console.log(data);
    //   this.employeeList = data['content'];
    // });
  }

  findAllPageable(){

    this.isTrue2 = true;

    this.employeeService.findAllPageable(this.page).subscribe(
      data=>{
        this.employeePage=data['content']
        this.pages=new Array(data['totalPages'])
        this.currentPage= data['pageNumber']
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page= i;
    this.findAllPageable();
  }

  detailCustomer(employee: any) {
    this.router.navigate(['/admin/employee', employee.employeeId]);
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/admin/employee/update', employee.employeeId]);
  }

  search() {
    this.isTrue=true;
    console.log(this.isTrue)
    console.log(this.isSubmitted)
    this.employeeService.findAllEmployeeName(this.searchName.trim(),this.searchId.trim()).toPromise().then(data => {
      console.log(data);
      if (data) {
        this.employeePage = data['content']
        this.pages = new Array(data['totalPages'])
        this.currentPage = data['pageNumber']
        this.isSubmitted=true;
        this.isTrue2=true;
      }
    },
      (error) => {
        console.log(error.error.message);
        this.isSubmitted=false;
        this.isTrue2=false;
      }
      );
  }
}
