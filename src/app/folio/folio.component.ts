import { 
  Component, 
  ViewEncapsulation, 
  AfterViewInit, 
  ElementRef, 
  ViewChild, 
  Renderer2, 
  Inject, 
  PLATFORM_ID 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import bootstrap from '../../main.server';

@Component({
  selector: 'app-folio',
  standalone: true,
  templateUrl: './folio.component.html',
  styleUrls: ['./folio.component.css'],
  encapsulation: ViewEncapsulation.None  
})

export class FolioComponent implements AfterViewInit {
  
  isMenuOpen = false;
  
  [x: string]: any;
  @ViewChild('textElement') textElement!: ElementRef;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    console.log(this.textElement);
    if (this.textElement) {
      const text: string = this.textElement.nativeElement.textContent;
      this.renderer.setProperty(this.textElement.nativeElement, 'innerHTML', '');

      const lines = text.split('\n');
      for (let line of lines) {
        const lineSpan = this.renderer.createElement('span');
        lineSpan.style.display = 'block';

        for (let letter of line) {
          const letterSpan = this.renderer.createElement('span');
          this.renderer.setProperty(letterSpan, 'textContent', letter === ' ' ? '\u00A0' : letter);
          this.renderer.appendChild(lineSpan, letterSpan);
        }

        this.renderer.appendChild(this.textElement.nativeElement, lineSpan);
      }
    } else {
      console.error('textElement is undefined');
    }

    // Stars functionality removed
  }
}
