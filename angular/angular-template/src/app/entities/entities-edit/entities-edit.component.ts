import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entities} from "../../model/entities";
import {EntitiesService} from "../../service/entities.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-entities-edit',
  templateUrl: './entities-edit.component.html',
  styleUrls: ['./entities-edit.component.css']
})
export class EntitiesEditComponent implements OnInit {
  entitiesForm :FormGroup;
  entities : Entities;
  cageList : String[];
  constructor(private entitiesService : EntitiesService, private route : Router,private activatedRoute : ActivatedRoute) {
    this.entitiesService.getListCage().subscribe(cage =>{
      this.cageList=cage;
    })
    this.activatedRoute.paramMap.subscribe(next =>{
    const id = next.get("id");
    console.log(id);
    this.entitiesService.findById(id).subscribe((data) => {
        this.entities = data;
        console.log(this.entities);
      this.entitiesForm = new FormGroup({
        entitiesId: new FormControl( "",[Validators.required]),
        inDate: new FormControl(),
        outDate: new FormControl(),
        status: new FormControl(),
        weight: new FormControl(),
        cageId: new FormControl(),
      })
      this.entitiesForm.patchValue(this.entities);
      })
    })

  }

  ngOnInit(): void {
  }

  updateEntities() {
    this.entitiesService.updateEntities(this.entitiesForm.value.entitiesId,this.entitiesForm.value).subscribe((data) => {
      this.entities = data['content'];
      console.log(this.entities);
      console.log(this.entitiesForm.value.entitiesId);
    });
  }
}
