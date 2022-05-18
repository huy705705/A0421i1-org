import {Component, Inject, OnInit} from '@angular/core';
import {Notification} from "../../model/notification";
import {EntitiesService} from "../../service/entities.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../service/notification.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-notification-delete',
  templateUrl: './notification-delete.component.html',
  styleUrls: ['./notification-delete.component.css']
})
export class NotificationDeleteComponent implements OnInit {



  notification: Notification
  constructor(private notificationService:NotificationService, private router: Router,
              private activatedRoute: ActivatedRoute,public dialogRef: MatDialogRef<NotificationDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast : ToastrService) {
    console.log("data la:"+data)
    notificationService.findById(data).subscribe(
      value => {
        console.log(value)
        this.notification = value;
      }
    )
  }
  deleteNotification(id: string) {
    console.log(id)
    this.notificationService.deleteNotificationById(id).subscribe();
    this.dialogRef.close({event: true});
    // this.router.navigate(["/notification"])
    // this.ngOnInit();
    this.toast.warning("Xóa thông báo thành công!", "Thành công: ", {
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
