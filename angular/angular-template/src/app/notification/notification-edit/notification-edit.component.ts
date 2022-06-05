import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outdate";
import {Notification} from "../../model/notification";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize, switchMap} from "rxjs/operators";
import {ImageMetadata} from "../../files/shared/image-metadata";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {FileService} from "../../files/shared/file.service";

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {
  contentIsFalse: boolean = false;

  notificationForm: FormGroup;
  notification: Notification;

  //image cropper
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/image/image-default.png';
  croppedBlob: Blob;
  fileToUpload: File;
  metadata1: any;
  showSpinner = false;
  btnStyle: boolean;


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
              @Inject(AngularFireStorage) private db: AngularFireStorage,
              private router: Router, private fs: FileService,) {
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
        (error) => {
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
        // fix
        this.route.navigate(['employee/notification']);
        this.toast.success("Cập nhật cá thể thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      });
    }
  }

  selectedImage: any = null;
  loading = false;

  // showPreview(event: any) {
  //   this.selectedImage = event.target.files[0];
  //   const nameImg = this.selectedImage.name;
  //   const fileRef = this.storage.ref(nameImg);
  //   this.loading = true;
  //   this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         console.log(url);
  //         this.notificationForm.patchValue({image: url});
  //         this.loading = false;
  //         this.notification.image = url;
  //
  //         // Call API
  //
  //       });
  //     })
  //   ).subscribe();
  // }
// fix
  compare() {
    if (this.notificationForm.value.content.length < 30) {
      this.contentIsFalse = true;
    } else {
      this.contentIsFalse = false;
    }
  }

//  edit image cropper


  save1() {
    if (this.contentIsFalse) {
      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else if (this.fileToUpload == undefined) {
      console.log("this.fileToUpload=undefined")
      // this.notificationForm.patchValue({
      //   image:
      //     'https://firebasestorage.googleapis.com/v0/b/huynpq-548dd.appspot.com/o/product-pictures%2F9cesw6i7ivwfGeJ8w5Ja?alt=media&token=d12b373e-c09a-4aa5-adb9-2c75538175bf'
      // });
      this.notificationService.updateNotification(this.notificationForm.value.notificationId, this.notificationForm.value).subscribe((data) => {
        console.log(data)
        // this.router.navigate(['../'],
        //   {relativeTo: this.activatedRoute});
        // this.route.navigate(['employee/notification']);
        console.log("123")
        this.router.navigateByUrl('employee/notification').then(r => this.toast.success("Chỉnh sửa thông báo thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        }));

      }, error => {
        console.log(error.message)
        console.log(this.notificationForm)


      });
    } else {
      this.btnStyle = true;
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 10000)
      console.log('Add');
      const notificationData = this.notificationForm.value;
      console.log(notificationData);
      console.log(this.getMetaDataForImage());
      if (this.fileToUpload) {
        this.fs.upload(this.fileToUpload)
          .pipe(
            switchMap(metadata => {
              this.metadata1 = metadata;
              // notificationData.pictureId = metadata.id;
              console.log(metadata.id);
              console.log(metadata.id);
              this.db.ref('product-pictures/' + this.metadata1.id).getDownloadURL().subscribe((url) => {

                this.notificationForm.patchValue({image: url});
                console.log('url:' + this.notificationForm.value.image.toString())
                console.log(url);
                console.log(this.notificationForm.value)
              });
              return this.db.ref('product-pictures/' + this.metadata1.id).getDownloadURL();
            })
          )
          .subscribe(product => {

            this.db.ref('product-pictures/' + this.metadata1.id).getDownloadURL().subscribe((url) => {
              console.log(url);
              console.log(this.notificationForm.value)
              this.notificationService.updateNotification(this.notificationForm.value.notificationId, this.notificationForm.value).subscribe((data) => {
                console.log(data)
                // this.router.navigate(['../'],
                //   {relativeTo: this.activatedRoute});
                // this.route.navigate(['employee/notification']);
                console.log("123")
                this.router.navigateByUrl('employee/notification').then(r => this.toast.success("Chỉnh sửa thông báo thành công!", "Thành công: ", {
                  timeOut: 4000,
                  extendedTimeOut: 1000
                }));

              }, error => {
                console.log(error.message)
                console.log(this.notificationForm)


              });

            });
          });
      }
    }
  }

  private getMetaDataForImage(): ImageMetadata {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    }
    return undefined;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload)
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    // Converting for upload
    const fileBeforeCrop = this.imageChangedEvent.target.files [0];
    this.fileToUpload = new File([event.file], fileBeforeCrop.name
      , {type: fileBeforeCrop.type});
    console.log(this.fileToUpload.name);
    // Preview
    // this.croppedImage = event.base64;
    // this.croppedBlob = event.file;
  }
}
