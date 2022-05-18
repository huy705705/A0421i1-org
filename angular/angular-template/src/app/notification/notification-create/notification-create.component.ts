import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entities} from "../../model/entities";
import {Notification} from "../../model/notification";
import {ToastrService} from "ngx-toastr";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outdate";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {
  selectedImage: any = null;

  notificationForm: FormGroup;
  notification: Notification;
  notificationId: string;
  contentIsFalse: boolean = false;
  wasEdit: boolean = false;

  constructor(private notificationService: NotificationService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private toast: ToastrService,
              @Inject(LOCALE_ID) private locale: string,) {

  }

  validationMessages = {
    notificationId: [
      {type: 'required', message: ''}
    ],
    content: [
      {type: 'required', message: 'Nội dung thông báo không được trống!'},
      {type: 'minlength', message: 'Thông báo không nhỏ hơn 30 kí tự !'}
    ],

  }

  ngOnInit(): void {
    this.notificationForm = new FormGroup({
      image: new FormControl(''),
      content: new FormControl('', [Validators.required,
        Validators.minLength(30)]),
      uploadDate: new FormControl(''),

    });
    this.notificationForm.patchValue({
      uploadDate: formatDate(Date.now(), "yyyy-MM-dd", this.locale)
    })
    console.log()
  }

  save() {
    if (this.contentIsFalse) {
      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {


      console.log("save(): ")
      console.log(this.notificationForm.value)
      // upload image to firebase
      // const nameImg = this.getCurrentDateTime();
      const nameImg = this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      console.log("nameImg " + nameImg)
      console.log("fileRef " + fileRef)

      console.log(fileRef)

      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.notificationForm.patchValue({image: url});

            // Call API to create notification
            this.notificationService.createNotification(this.notificationForm.value).subscribe(() => {
                console.log("123")
                this.router.navigateByUrl('/notification').then(r => this.toast.warning("Tạo thông báo thành công!", "Thành công: ", {
                  timeOut: 4000,
                  extendedTimeOut: 1000
                }));
                console.log("123")

              }, error => {
                console.log(error.message)
                console.log(this.notificationForm)
              }
            )
          });
        })
      ).subscribe();
    }
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage)
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  compare() {
    if (this.notificationForm.value.content.length < 30) {
      this.contentIsFalse = true;
    }else {
      this.contentIsFalse=false;
    }
  }
}
