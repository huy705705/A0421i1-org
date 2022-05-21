import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../service/employee.service";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  employee: IEmployeeDTO;

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

  ngOnInit(): void {
  }

  deleteEmployee(id: string) {
    console.log(id)
    this.employeeService.deleteEmployeeById(id).subscribe();
    this.dialogRef.close({event: true});
    this.toast.warning("Xóa nhân viên thành công!", "Thành công: ", {
      timeOut: 4000,
      extendedTimeOut: 1000
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
