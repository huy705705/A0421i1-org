import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../service/employee.service";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {Employee} from "../../model/Employee";

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  employee: Employee;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor( private employeeService: EmployeeService,
               private router: Router,
               private activatedRoute: ActivatedRoute,public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private toast : ToastrService) {
    console.log("data la:"+data)
    employeeService.findById(data).subscribe(
      value => {
        console.log(value)
        this.employee = value;
      }
    )
  }

  deleteEmployee(id: string) {
    console.log(id)
    this.employeeService.deleteEmployeeById(id).subscribe();
    this.dialogRef.close({event: true});
    this.deleteComplete.emit(true);
    this.toast.warning("Xóa nhân viên thành công!", "Thành công: ", {
      timeOut: 4000,
      extendedTimeOut: 1000
    })
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
