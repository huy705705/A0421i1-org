export class LogCage {
  id : number;
  cageId : string;
  employeeId: string;
  editDate : string;
  editedFields : string;

  constructor(cageId: string, employeeId: string, editDate: string, editedFields: string) {
    this.cageId = cageId;
    this.employeeId = employeeId;
    this.editDate = editDate;
    this.editedFields = editedFields;
  }
}
