import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outdate";
import {Notification} from "../../model/notification";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {
  contentIsFalse: boolean = false;

  notificationForm: FormGroup;
  notification:Notification;
  validationMessages = {
    notificationId: [
      {type: 'required', message: ''}
    ],
    content: [
      {type: 'required', message: 'Nội dung thông báo không được trống!'},
      {type: 'minlength', message: 'Thông báo không nhỏ hơn 30 kí tự !'}
    ],
  }
  constructor(private notificationService: NotificationService, private route: Router,
              private activatedRoute: ActivatedRoute, private toast: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get("id");
      console.log(id);
      this.notificationService.findById(id).subscribe((data) => {


          this.notification = data;
          console.log("this.notification: ");
          console.log(this.notification);
          this.notificationForm = new FormGroup({

            image: new FormControl(''),
            notificationId: new FormControl(''),
            content: new FormControl('', [Validators.required,
              Validators.minLength(30)]),
            uploadDate: new FormControl(''),
            delete: new FormControl(''),

          })
          this.notificationForm.patchValue(this.notification);
        },
        (error)=>{
          console.log(error.message);
          this.route.navigateByUrl("/404")
        })
    })
    // this.compare()

  }

  ngOnInit(): void {
  }
  updateNotification() {
    if (this.contentIsFalse) {
      console.log(this.notificationForm.value.image)

      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {


      this.notificationService.updateNotification(this.notificationForm.value.notificationId, this.notificationForm.value).subscribe((data) => {
        this.notification = data['content'];
        this.route.navigate(['admin/notification']);
        this.toast.success("Cập nhật cá thể thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      });
    }
  }

  selectedImage: any = null;
  loading = false;

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.notificationForm.patchValue({image: url});
          this.loading = false;
          this.notification.image = url;

          // Call API

        });
      })
    ).subscribe();
  }
// fix
  compare() {
    if (this.notificationForm.value.content.length < 30) {
      this.contentIsFalse = true;
    }else {
      this.contentIsFalse=false;
    }
  }
}
