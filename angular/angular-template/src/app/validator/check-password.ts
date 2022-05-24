import {AbstractControl} from "@angular/forms";

export function checkPassword(control :AbstractControl) {
  const v = control.value;
  return (v.password === v.confirmPassword) ? null : {
    notMatch: true
  };
}
