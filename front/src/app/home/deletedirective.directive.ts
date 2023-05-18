import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDeletedirective]',
})
export class DeletedirectiveDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  private _isActive = false;

  @HostListener('click', ['$event'])
  onClick(e: any) {
    e.preventDefault();
    this._isActive = !this._isActive;
    if (this._isActive) {
      this.renderer.addClass(this.el.nativeElement, 'hideElem');
      // this.renderer.removeClass(this.el.nativeElement, 'hideElem');
    } else {
      // this.renderer.removeClass(this.el.nativeElement, 'active');
      // this.renderer.addClass(this.el.nativeElement, 'hideElem');
    }
  }
}
