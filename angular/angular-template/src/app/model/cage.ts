export class Cage {
  cageId : string;
  employeeName: string;
  employeeId: string;
  quantity :number;
  entitiesQuantity: number;
  createdDate : string;
  closedDate : string;

  constructor(cageId: string, employeeName: string, quantity: number, entitiesQuantity: number, createDate: string, closeDate: string) {
    this.cageId = cageId;
    this.employeeName = employeeName;
    this.quantity = quantity;
    this.entitiesQuantity = entitiesQuantity;
    this.createdDate = createDate;
    this.closedDate = closeDate;
  }


}
