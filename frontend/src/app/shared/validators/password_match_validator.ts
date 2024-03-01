import { AbstractControl } from '@angular/forms';

export const PasswordsMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    // First to check if undefined just return out of it normally it doesnt happen but we do for bypassing compiler error
    if (!passwordControl || !confirmPasswordControl) return;

    // If value not equal then show error in one of control or both here we showing just in confirm password
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      // remove the not match validation errors etc
      const errors = confirmPasswordControl.errors;
      if (!errors) return; // nothing to remove just get out
      //   otherwise delete errors that not match by using the delete keyword so removing properties from object this is part of js
      delete errors['notMatch'];

      //   after removing not match setting errors once again. So if they dont match there will be error if they are same value we will remove not match error
      confirmPasswordControl.setErrors(errors);
    }
  };
  //   validators made so lets return out of PasswordsMatchValidator
  return validator;
};
