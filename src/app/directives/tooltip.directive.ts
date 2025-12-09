import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Inject,
  NgZone,
  OnDestroy,
  Input
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  private tooltipElement: HTMLElement | null = null;

  // Текст подсказки (задаётся через [appTooltip]="\"Текст\"")
  @Input('appTooltip') tooltipText = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(NgZone) private ngZone: NgZone
  ) {}

  // При наведении — показываем tooltip
  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;

    this.ngZone.runOutsideAngular(() => {
      this.createTooltip();
      this.positionTooltip();
    });
  }

  // При уходе курсора — скрываем
  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  // При перемещении курсора — обновляем позицию
  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.ngZone.runOutsideAngular(() => {
      this.positionTooltip(event);
    });
  }

  private createTooltip() {
    if (this.tooltipElement) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );

    // Добавляем классы и стили
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.2s');

    // Вставляем в тело документа
    if (this.tooltipElement) {
      document.body.appendChild(this.tooltipElement);
    }


    // Плавное появление
    setTimeout(() => {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0.8');
    });
  }

  private positionTooltip(event?: MouseEvent) {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    let x = hostRect.left + hostRect.width / 2;
    let y = hostRect.bottom + 8;

    // Если есть event — используем координаты курсора
    if (event) {
      x = event.pageX;
      y = event.pageY + 12;
    }

    this.renderer.setStyle(this.tooltipElement, 'left', `${x}px`);
    this.renderer.setStyle(this.tooltipElement, 'top', `${y}px`);
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  ngOnDestroy() {
    this.removeTooltip();
  }
}
