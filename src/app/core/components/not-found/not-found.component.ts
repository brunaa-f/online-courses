import { Component, ElementRef, ViewChild } from '@angular/core';
import lottie from 'lottie-web';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

  constructor(
    private titleService: Title
  ) { }

  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/404-animation.json',
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Not Found');
  }

}
