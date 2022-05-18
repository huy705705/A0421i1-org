import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {
  notificationForm: FormGroup;
  validationMessages = {
    notificationId: [
      {type: 'required', message: ''}
    ],
    content: [
      {type: 'required', message: 'Nội dung thông báo không được trống!'},
      {type: 'minlength', message: 'Thông báo không nhỏ hơn 30 kí tự !'}
    ],
  }
  constructor(private entitiesService: NotificationService, private route: Router, private activatedRoute: ActivatedRoute, private toast: ToastrService) {
    this.notificationForm = new FormGroup({});
  }

  ngOnInit(): void {
  }

}
