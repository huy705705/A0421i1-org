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

  employeeList = [];

  constructor(private employeeService: EmployeeService, private router: Router){
    employeeService.findAll().subscribe(next => {

      this.employeeList = next;
    });
  }

  ngOnInit(): void {
    this.employeeService.findAll().subscribe((data) => {
      console.log(data);
      this.employeeList = data['content'];
    });
  }

  detailCustomer(employee: any) {
    this.router.navigate(['/employee', employee.id]);
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/employee/update', employee.id]);
  }
}
