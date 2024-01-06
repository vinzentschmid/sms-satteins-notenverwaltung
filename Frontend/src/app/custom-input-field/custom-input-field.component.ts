import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'app-custom-input-field',
  templateUrl: './custom-input-field.component.html',
  styleUrls: ['./custom-input-field.component.scss'],
})
export class CustomInputFieldComponent {
  @Input() label = 'Default Label';
  @Input() type = 'text';

  isInputFocused = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  onInputValueChange(value: string) {
    // Add any additional logic when the input value changes if needed
  }
}
