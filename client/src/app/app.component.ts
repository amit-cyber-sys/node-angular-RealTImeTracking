import { Component } from '@angular/core';
import { GetLocationService } from './get-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private getLocationService: GetLocationService) {
  }
}
