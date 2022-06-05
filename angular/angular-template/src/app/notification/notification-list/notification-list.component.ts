import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {FormGroup} from "@angular/forms";
import {EntitiesDeleteComponent} from "../../entities/entities-delete/entities-delete.component";
import {NotificationDeleteComponent} from "../notification-delete/notification-delete.component";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notificationForm: FormGroup;
  dialogRef: MatDialogRef<NotificationDeleteComponent>;
  page: number = 0;
  notification2: Array<any>;
  notification: Array<any>;
  pages: Array<number>;
  entities: any;
  uploadDateMin = '';
  uploadDateMax = '';
  emptyMessenger = '';
  cage = '';
  isSubmitted = false;
  isTrue = false;
  isTrue2 = true;
  deleteMessenger;
  isSearch: boolean = false;
  isAdminRole: boolean = true;


  pageTotal: number = 0;
  // Cac bien cho seacrh
  pageSearch: Array<number>;
  pageSearchCurrent: number = 0;
  pageSearchTotal: number = 0;
  constructor(private notificationService: NotificationService, private router: Router, public dialog: MatDialog,  private tokenStorageService:TokenStorageService) {
    this.findAllPageable();
  }

  ngOnInit(): void {
    this.findAllPageable()
    this.check()
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
    console.log("Id " + notificationId)
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


  //search
  search() {
    this.pageSearchCurrent = 0;
    this.isSearch = true;
    this.isTrue = true;
    console.log(this.isTrue)
    console.log(this.isSubmitted)
    console.log("uploadDateMin")
    console.log(this.uploadDateMin)
    console.log("uploadDateMax")
    console.log(this.uploadDateMax)
    this.notificationService.searchNotification(this.uploadDateMin, this.uploadDateMax, this.pageSearchCurrent).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.notification = data['content']
          this.pageSearch = new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];

          this.isSubmitted = true;
          this.isTrue2 = true;


        }
      },
      (error) => {
        console.log(error.message)
        this.isSubmitted = false;
        this.isTrue2 = false;
      }
    );
  }

  setSearch(i: number , event: any) {
    event.preventDefault();
    this.pageSearchCurrent = i;
    console.log(this.pageSearchCurrent)
    this.notificationService.searchNotification(this.uploadDateMin, this.uploadDateMax, this.pageSearchCurrent).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.notification = data['content']
          this.pageSearch = new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];

          this.isSubmitted = true;
          this.isTrue2 = true;


        }
      },
      (error) => {
        console.log(error.message)
        this.isSubmitted = false;
        this.isTrue2 = false;
      }
    );
  }

  check() {
    const currentUser = this.tokenStorageService.getUser();
    let actualRole: string [] = [];
    if (currentUser !== null) {

      let roles = currentUser.roles;

      for (let role of roles) {
        actualRole.push(role['authority']);
      }
    }
    actualRole.sort();
    console.log("actualRole")
    console.log(actualRole.indexOf("ROLE_ADMIN"))
    if (actualRole.indexOf("ROLE_ADMIN")==-1){
      this.isAdminRole=false;
    }
  }
}
