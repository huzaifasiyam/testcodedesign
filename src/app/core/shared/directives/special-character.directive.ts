import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[noSpecialCharacter]'
})
export class SpecialCharacterDirective {

  regexStr = "^[a-zA-Z0-9 ]+$";
  constructor(private el: ElementRef) { }
  // check for keypress event in input field, allow only those that matches the regex
  @HostListener('keypress', ['$event'])
  onKeyPress(event:any) {
    return new RegExp(this.regexStr).test(event.key);
  }
  // check for paste event, and validate if matches the regex below
  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    this.validateFields(event);
  }
  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').replace(/[^0-9 -]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }

}
