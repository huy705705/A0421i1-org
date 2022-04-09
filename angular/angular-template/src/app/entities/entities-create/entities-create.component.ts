import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Entities} from "../../model/entities";

@Component({
  selector: 'app-entities-create',
  templateUrl: './entities-create.component.html',
  styleUrls: ['./entities-create.component.css']
})
export class EntitiesCreateComponent implements OnInit {
  entitiesForm: FormGroup;
  entities : Entities;
  cageList=[];
  constructor(private entitiesService: EntitiesService, private router: Router ) {
    this.entitiesService.getListCage().subscribe((data)=>{
    this.cageList=data;
    this.entitiesForm = new FormGroup({
      entitiesId: new FormControl("", [Validators.required]),
      inDate: new FormControl(),
      outDate: new FormControl(),
      isDelete: new FormControl(0),
      status: new FormControl(),
      weight: new FormControl(),
      cageId: new FormControl()

    })
    })

  }

  ngOnInit(): void {
  }

  createEntities() {
    this.entitiesService.createEntities(this.entitiesForm.value).subscribe((data) => {
      this.entities = data['content'];
      console.log(this.entities);
    });
  }

}
