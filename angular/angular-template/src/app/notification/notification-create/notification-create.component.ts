import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entities} from "../../model/entities";
import {Notification} from "../../model/notification";
import {ToastrService} from "ngx-toastr";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outdate";
import {finalize, switchMap} from "rxjs/operators";
import {formatDate} from "@angular/common";
import {FileService} from "../../files/shared/file.service";
import {ImageMetadata} from "../../files/shared/image-metadata";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {
  selectedImage: any = null;
  // selectedImage1: any = null;
  btnStyle: boolean;
  notificationForm: FormGroup;
  notification: Notification;
  notificationId: string;
  contentIsFalse: boolean = false;
  wasEdit: boolean = false;
  imageThis = "assets/image/image-default.png";
  showSpinner = false;
  private clicked: boolean;
  //crop image
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/image/image-default.png';
  croppedBlob: Blob;
  fileToUpload: File;
  metadata1: any;

  constructor(private notificationService: NotificationService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private toast: ToastrService,
              @Inject(LOCALE_ID) private locale: string,
              //crop image
              private activatedRoute: ActivatedRoute,
              private fs: FileService, private db: AngularFireStorage
  ) {

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
  spinnerStyle: any;

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
    this.compare()
  }

  save() {
    if (this.contentIsFalse) {
      console.log(this.notificationForm.value.image)

      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {
      this.btnStyle = true;
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 10000)
      console.log("save(): ")
      console.log(this.notificationForm.value)
      // upload image to firebase
      // const nameImg = this.getCurrentDateTime();
      // if (this.selectedImage.name == "") {
      //   this.selectedImage.name = "homeeasdad.png"
      // }
      const nameImg = this.selectedImage.name;
      // const nameImg1 = this.selectedImage1.name;
      const fileRef = this.storage.ref(nameImg);

      console.log("nameImg " + nameImg)
      console.log("fileRef " + fileRef)
      // console.log(nameImg1)
      console.log(fileRef)

      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          console.log(fileRef)
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(fileRef)

            this.notificationForm.patchValue({image: url});
            console.log('url:' + this.notificationForm.value.image.toString())
            console.log(this.notificationForm.value)

            // Call API to create notification
            this.notificationService.createNotification(this.notificationForm.value).subscribe(() => {
                console.log("123")
                this.router.navigateByUrl('employee/notification').then(r => this.toast.success("Tạo thông báo thành công!", "Thành công: ", {
                  timeOut: 4000,
                  extendedTimeOut: 1000
                }));

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
    console.log(this.selectedImage)
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage)
    console.log(this.notificationForm.value.image)
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
    console.log(this.selectedImage);
    console.log(this.selectedImage.name);
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  compare() {
    if (this.notificationForm.value.content.length < 30) {
      this.contentIsFalse = true;
    } else {
      this.contentIsFalse = false;
    }
  }


  //crop image

  save1() {
    if (this.contentIsFalse) {
      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    }else if (this.fileToUpload==undefined){
      console.log("this.fileToUpload=undefined")
      this.notificationForm.patchValue({image:
          'https://firebasestorage.googleapis.com/v0/b/huynpq-548dd.appspot.com/o/product-pictures%2F9cesw6i7ivwfGeJ8w5Ja?alt=media&token=d12b373e-c09a-4aa5-adb9-2c75538175bf'});
      this.notificationService.createNotification(this.notificationForm.value).subscribe((data) => {
        // console.log(data)
        // this.router.navigate(['../'],
        //   {relativeTo: this.activatedRoute});
        console.log("123")
        this.router.navigateByUrl('employee/notification').then(r => this.toast.success("Tạo thông báo thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        }));

      }, error => {
        console.log(error.message)
        console.log(this.notificationForm)
      });
    }
    else {
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
              this.notificationService.createNotification(this.notificationForm.value).subscribe((data) => {
                // console.log(data)
                // this.router.navigate(['../'],
                //   {relativeTo: this.activatedRoute});
                console.log("123")
                this.router.navigateByUrl('employee/notification').then(r => this.toast.success("Tạo thông báo thành công!", "Thành công: ", {
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


  save2() {
    if (this.contentIsFalse) {
      console.log(this.notificationForm.value.image)

      this.toast.error("Thông tin thông báo không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {
      this.btnStyle = true;
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 10000)
      console.log("save(): ")
      console.log(this.notificationForm.value)

      console.log('Add');
      const productData = this.notificationForm.value;
      console.log(productData);
      console.log(this.getMetaDataForImage());
      if (this.fileToUpload) {
        this.fs.upload(this.fileToUpload)
          .pipe(
            switchMap(metadata => {
              this.metadata1 = metadata;
              productData.pictureId = metadata.id;
              console.log(metadata.id);
              console.log(metadata.id);
              this.db.ref('product-pictures/' + this.metadata1.id).getDownloadURL().subscribe((url) => {
                this.notificationForm.patchValue({image: url});

                console.log(url);
              });
              return this.notificationService.createNotification(this.notificationForm.value);
            })
            // finalize(() => {
            //   fileRef.getDownloadURL().subscribe((url) => {
          )
          .subscribe(product => {
            this.router.navigate(['../'],
              {relativeTo: this.activatedRoute});
            this.db.ref('product-pictures/' + this.metadata1.id).getDownloadURL().subscribe((url) => {
              console.log(url);
            });
          });
      }
    }
  }
}
