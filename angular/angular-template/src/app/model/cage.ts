export class Cage {
  cageId : string;
  employeeName: string;
  quantity :number;
  entitiesQuantity: number;
  createdDate : string;
  closedDate : string;

  constructor(cageId: string, employeeName: string, quantity: number, entitiesQuantity: number, createdDate: string, closedDate: string) {
    this.cageId = cageId;
    this.employeeName = employeeName;
    this.quantity = quantity;
    this.entitiesQuantity = entitiesQuantity;
    this.createdDate = createdDate;
    this.closedDate = closedDate;
  }

}
