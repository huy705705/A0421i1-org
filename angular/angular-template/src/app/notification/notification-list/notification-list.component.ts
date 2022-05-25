import { Component, OnInit } from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {FormGroup} from "@angular/forms";
import {EntitiesDeleteComponent} from "../../entities/entities-delete/entities-delete.component";
import {NotificationDeleteComponent} from "../notification-delete/notification-delete.component";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  entitiesForm: FormGroup;
  dialogRef: MatDialogRef<NotificationDeleteComponent>;
     page: number = 0;
  entities2: Array<any>;
  notification: Array<any>;
  pages: Array<number>;
  entities: any;
  inDateMin = '';
  inDateMax = '';
  emptyMessenger = '';
  cage = '';
  isSubmitted=false;
  isTrue=false;
  isTrue2=true;
  deleteMessenger;
  isSearch : boolean=false;


  pageTotal:number=0;
  // Cac bien cho seacrh
  pageSearch :Array<number>;
  pageSearchCurrent :number=0;
  pageSearchTotal :number=0;
  constructor(private notificationService: NotificationService, private router: Router, public dialog: MatDialog) {
    this.findAllPageable();
  }

  ngOnInit(): void {
    this.findAllPageable()
    console.log(this.isTrue)
  }
  findAllPageable() {
    this.isTrue2 = true;

    this.notificationService.findAllPageable(this.page).subscribe(
      data => {
        // console.log(data)

        this.notification = data['content']
        // console.log(this.notification)
        this.pages = new Array(data['totalPages'])
        this.pageTotal = data['totalPages']

      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAllPageable();
  }
  openDialog(notificationId: any) {
    console.log("Id "+notificationId)
    this.dialogRef = this.dialog.open(NotificationDeleteComponent, {
      width: '600px',
      data: notificationId,
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessenger = 'Nhân viên ' + notificationId + ' đã được xoá thành công';
        this.page = 0;
        this.ngOnInit();
      }
    });
  }
}
