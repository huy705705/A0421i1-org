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

  // employeeList = [];
  private page:number= 0;
  employeePage:Array<any>;
  pages:Array<number>;

  constructor(private employeeService: EmployeeService, private router: Router){
    // employeeService.findAll().subscribe(next => {
    //   this.employeeList = next;
    // });
  }

  ngOnInit(): void {
    this.findAllPageable()

    // this.employeeService.findAll().subscribe((data) => {
    //   console.log(data);
    //   this.employeeList = data['content'];
    // });

  }

  findAllPageable(){
    this.employeeService.findAllPageable(this.page).subscribe(
      data=>{
        this.employeePage=data['content']
        this.pages=new Array(data['totalPages'])
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
    this.router.navigate(['/employee', employee.id]);
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/employee/update', employee.id]);
  }


}
