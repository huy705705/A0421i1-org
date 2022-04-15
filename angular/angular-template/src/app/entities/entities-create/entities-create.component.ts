import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities-create',
  templateUrl: './entities-create.component.html',
  styleUrls: ['./entities-create.component.css']
})
export class EntitiesCreateComponent implements OnInit {
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

  constructor() { }

  ngOnInit(): void {
  }

}
