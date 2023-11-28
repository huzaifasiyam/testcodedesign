import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[OnlyNumber]'
})
export class AllowOnlyNumberDirective {

  // regexStr = '^[0-9]*$';
  // constructor(private el: ElementRef) { }

  // @Input() OnlyNumber: boolean;

  // @HostListener('keydown', ['$event']) onKeyDown(event) {
  //   let e = <KeyboardEvent> event;
  //   if (this.OnlyNumber) {
  //       if (
  //       // Allow: Ctrl+A
  //       (e.keyCode == 48 && e.ctrlKey === true) ||
  //       // Allow: Ctrl+C
  //       (e.keyCode == 57 && e.ctrlKey === true) ||
  //       // Allow: Ctrl+V
  //       (e.keyCode == 86 && e.ctrlKey === true) ||
  //       // Allow: Ctrl+X
  //       (e.keyCode == 88 && e.ctrlKey === true) ||
  //       // Allow: home, end, left, right
  //       (e.keyCode >= 35 && e.keyCode <= 39)) {
  //         // let it happen, don't do anything
  //         return;
  //       }
  //     let ch = String.fromCharCode(e.keyCode);
  //     let regEx =  new RegExp(this.regexStr);    
  //     if(regEx.test(ch))
  //       return;
  //     else
  //        e.preventDefault();
  //     }
  // }

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
