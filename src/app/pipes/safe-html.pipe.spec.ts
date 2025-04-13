import { BrowserModule, DomSanitizer, SafeValue } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {

  let sanitizer;
  let pipe: SafeHtmlPipe;
  const unsafeHtml = `<a href="javascript:alert('XSS')">Unsafe</a>`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    })
    sanitizer = TestBed.inject(DomSanitizer)
    pipe = new SafeHtmlPipe(sanitizer);
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
