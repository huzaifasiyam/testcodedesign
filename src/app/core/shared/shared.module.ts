import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowOnlyNumberDirective } from './directives/allow-only-number.directive';
import { AvoidNumbersDirective } from './directives/avoid-numbers.directive';
import { SpecialCharacterDirective } from './directives/special-character.directive';



@NgModule({
  declarations: [
    AllowOnlyNumberDirective,
    AvoidNumbersDirective,
    SpecialCharacterDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AllowOnlyNumberDirective,
    AvoidNumbersDirective,
    SpecialCharacterDirective
  ]
})
export class SharedModule { }
