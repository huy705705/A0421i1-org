export class Entities {
  entitiesId : string;
  inDate : string;
  outDate : string;
  status : string;
  weight : number;
  isDelete : boolean;
  cageId : string;


  constructor(entitiesId: string, inDate: string, outDate: string, status: string, weight: number, isDelete: boolean, cageId: string) {
    this.entitiesId = entitiesId;
    this.inDate = inDate;
    this.outDate = outDate;
    this.status = status;
    this.weight = weight;
    this.isDelete = isDelete;
    this.cageId = cageId;
  }
}
