import {IAccount} from "./IAccount";

export interface Employee {
  employeeId: string;
  employeeName: string;
  email: string;
  birthday: string;
  gender: boolean;
  idCard: string;
  avatar: string;
  isDelete: string;
  address: string;
  account: IAccount;
}
