import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';
import {EntitiesDeleteComponent} from "../../entities/entities-delete/entities-delete.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {IAccount} from "../../model/IAccount";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public page = 0;
  dialogRef: MatDialogRef<EmployeeDeleteComponent>;
  deleteMessenger;
  employeeList:IEmployeeDTO[];
  accountList: IAccount[];
  pages: any;
  totalPages: number;
  public searchName ="";
  public searchId   ="";
  isSubmitted=false;
  isTrue=false;
  isTrue2=true;


  constructor(private employeeService: EmployeeService,
              private accountService: AccountService,
              private router: Router,
              public dialog: MatDialog){
  }

  ngOnInit(): void {
    // this.findAllPageable();
    this.search();
    // this.accountService.findAll().toPromise().then(r => {
    //   this.accountList = r;
    //   console.log(r);
    //   console.log(this.accountList);
    // });
  }

  // findAllPageable(){
  //
  //   this.isTrue2 = true;
  //
  //   this.employeeService.findAllPageable(this.page).subscribe(
  //     data=>{
  //       this.employeeList=data['content']
  //       this.pages= new Array(data['totalPages'])
  //       this.currentPage= data['currentPage']
  //     },
  //     (error) => {
  //       console.log(error.error.message);
  //     }
  //   )
  // }

  // setPage(page, event: any) {
  //   event.preventDefault();
  //   this.page= page;
  //   this.search();
  // }

  openDialog(id) {
    console.log("Id "+id)
    this.dialogRef = this.dialog.open(EmployeeDeleteComponent, {
      width: '600px',
      data: id,
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessenger = 'Nhân viên ' + id + ' đã được xoá thành công';
        this.page = 0;
        this.ngOnInit();
      }
    });
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/admin/employee/update', employee.employeeId]);
  }

  search() {
    if (!Number(this.page) || Number(this.page) < 0) {
      this.page = 0;
    }

    this.isTrue=true;
    this.employeeService.findAllEmployeeName(this.searchName.trim(),this.searchId.trim(),this.page).toPromise().then(data => {
        console.log(data.length);
        this.employeeList = data['content']
        this.pages = data;
        this.totalPages= data['totalPages'];
        console.log(data);
        this.isSubmitted=true;
        this.isTrue2=true;
      },
      (error) => {
        console.log(error.error.message);
        this.pages = [];
        this.isSubmitted=false;
        this.isTrue2=false;
      }
    );
  }
}
