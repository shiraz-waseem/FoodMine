import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    InputContainerComponent,
    InputValidationComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true; // true by default
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' = 'text'; // either text or password or email and by default text

  get formControl() {
    return this.control as FormControl;
  }
}
