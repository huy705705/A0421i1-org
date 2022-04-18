import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outDate";
import validate = WebAssembly.validate;

@Component({
  selector: 'app-entities-create',
  templateUrl: './entities-create.component.html',
  styleUrls: ['./entities-create.component.css']
})
export class EntitiesCreateComponent implements OnInit {

  entitiesForm: FormGroup;
  entities : Entities;
  cageList=[];
  entitiesId :string ;
  validationMessages= {
    entitiesId:[
      {type: 'required',message: 'Id người ta đã render ra rồi dô sửa hả mày ai rảnh!!!'}
    ],
    inDate:[
      {type: 'required',message: 'Ngày vào chuồng không được trống!'}
    ],
    outDate:[
      {type: 'required',message: 'Ngày ra chuồng không được trống!'},
    ],
    status:[
      {type: 'required',message: 'Trạng thái không được trống!'},
      {type: 'maxlength',message: 'Trạng thái không dài hơn 50 kí tự !'},
      {type: 'minlength',message: 'Trạng thái không nhỏ hơn 3 kí tự !'}
    ],
    weight:[
      {type: 'required',message: 'Cân nặng không được trống!'},
      {type: 'max',message: 'Cân nặng không vượt quá 500kg!'},
      {type: 'min',message: 'Cân nặng không nhỏ hơn 0.01kg!'},
      {type: 'pattern',message: 'Sai định dạng'}
    ],
    cageId:[
      {type: 'required',message: 'Mã chuồng không được trống!'},
      {type: 'minlength',message: 'Trạng thái không nhỏ hơn 3 kí tự !'}
    ]
  }
  constructor(private entitiesService: EntitiesService, private router: Router ) {
    this.entitiesService.getListCage().subscribe((data)=>{
    this.cageList=data;
      this.entitiesForm = new FormGroup({
        entitiesId: new FormControl("",
          [Validators.required]),
        inDate: new FormControl("", [
          Validators.required,
          checkInDate
        ]),

        outDate: new FormControl("", [
          Validators.required,
          checkOutDate
        ]),
        status: new FormControl("", [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")
        ]),
        weight: new FormControl("", [
          Validators.required,
          Validators.max(500),
          Validators.min(0.01),
          Validators.pattern("-?[0-9]+(\.[0-9][0-9]?)?")
        ]),
        cageId: new FormControl("", [
          Validators.required,
          Validators.minLength(1)
        ]),
        isDelete: new FormControl(false)
      })
      })


  }

  ngOnInit(): void {
  }

  createEntities() {
    this.entitiesService.createEntities(this.entitiesForm.value).subscribe((data) => {
      this.entities = data['content'];
      this.router.navigateByUrl("/entities");
    });
  }
  getEntitiesId() {
    this.entitiesService.getEntitiesId(this.entitiesForm.value.cageId).subscribe((data) => {
      console.log(this.entitiesForm.value.cageId);
      if(data<10){
        this.entitiesId=this.entitiesForm.value.cageId+"-000"+data;
      }
      else if(data<100) {
        this.entitiesId = this.entitiesForm.value.cageId+"-00" + data;
      }
      else if(data<1000) {
        this.entitiesId = this.entitiesForm.value.cageId+"-0" + data;
      }
      else {
        this.entitiesId = this.entitiesForm.value.cageId+"-"+data;
      }
      if(data!=null){
        this.entitiesForm.patchValue({
          entitiesId:this.entitiesId,
        })
      }
    })
  }

  destroyHacker() {
    this.entitiesForm.patchValue({
      entitiesId:this.entitiesId,
    })
  }
}
