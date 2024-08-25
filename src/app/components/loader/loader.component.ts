import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { LoaderService } from 'src/app/service/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit {
  isLoading = this.loaderService.loaderState;
  constructor(private loaderService: LoaderService, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    const contentContainer = document.querySelector('#content-container');
    console.log("contentContainer", contentContainer, this.isLoading);
    if (contentContainer) {
      this.isLoading.subscribe(isLoading => {
        if (isLoading) {
          this.renderer.addClass(contentContainer, 'blur');
        } else {
          this.renderer.removeClass(contentContainer, 'blur');
        }
      });
    }
  }

}
