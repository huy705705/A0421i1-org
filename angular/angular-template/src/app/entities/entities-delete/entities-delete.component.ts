import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {EntitiesService} from "../../service/entities.service";

@Component({
  selector: 'app-entities-delete',
  templateUrl: './entities-delete.component.html',
  styleUrls: ['./entities-delete.component.css']
})
export class EntitiesDeleteComponent implements OnInit {
  entity: Entities

  constructor(private entitiesService:EntitiesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get("id");
      console.log(id)
      console.log(entitiesService.findById(id))
      entitiesService.findById(id).subscribe(next => {
        this.entity = next;
      });
    });
  };

  ngOnInit(): void {
  }

}
