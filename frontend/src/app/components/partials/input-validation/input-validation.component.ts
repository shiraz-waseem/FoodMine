import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match',
};

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css',
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  checkValidation() {
    // email errors const mein stored and check krlia if empty then error empty otherwise we have to get error keys using  object.keys function by passing arrays to it
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    // ['required','email']     we can easily map these keys upper defined hai into their messages so we have array of errors
    // jo key hugy wo wala return
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
    // this.errorMessages is an array and us mein map krryy
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');    we dont want to through errors we just want to check this.validators and go in ngOnInIt and for control value changes and status changes call check validations
    this.checkValidation();
  }

  // fields mein changes ke lia
  ngOnInit(): void {
    // Its for upper jo AbstractionChange ha
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    // Input value mein jab kch type kre
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }
}
