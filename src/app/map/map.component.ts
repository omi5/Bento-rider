import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  visibleForProfile: boolean = false;
  openForProfile(): void {   
    this.visibleForProfile = true;
  }

  closeForProfile(): void {
    this.visibleForProfile = false;
  }
  

  visibleForRideHistory: boolean = false;
  openForRideHistory(): void {   
    this.visibleForRideHistory = true;
  }

  closeForRideHistory(): void {
    this.visibleForRideHistory = false;
  }

  visibleForRideNotification: boolean = false;
  openForRideNotification(): void {   
    this.visibleForRideNotification = true;
  }

  closeForRideNotification(): void {
    this.visibleForRideNotification = false;
  }
}
