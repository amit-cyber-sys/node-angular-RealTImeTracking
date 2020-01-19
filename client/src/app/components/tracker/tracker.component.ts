import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { GetLocationService } from 'src/app/get-location.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  infoWindow
  position: object;
  userType: String;
  latitude: 18.552939;
  logitude: 73.771022;
  mapType = 'roadmap'
  constructor(private getLocation: GetLocationService,
     ) {
    this.userType = localStorage.getItem('userType');
    // console.log(this.userType);
  }

  ngOnInit(): void {
    // console.log(this.userType);
    if (this.userType == 'trucker') {
      const mapProperties = {
        center: new google.maps.LatLng(18.552939, 73.771022),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      
      console.log("mapProperties : ", mapProperties);
      console.log("this.map : ", this.map);
      if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log("available", navigator);
        navigator.geolocation.getCurrentPosition((position) => {
          this.position = position;
          if (this.position) {
            var location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            // this.latitude = 
            this.getLocation.sendLocation(location);
          }
          console.log("position : ", position);
          // this.getLocation.sendLocation(position);
          const mapProperties = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            animation: google.maps.Animation.DROP,
          };
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        })
      } else {
        /* geolocation IS NOT available */
        console.log("NOT available");
      }
      if ("geocoding" in navigator) {
        console.log("available", navigator);
      } else {
        console.log("NOT available");
      }
    } else {
      console.log("admin user");
      this.getLocation.onMessage().subscribe((data) => {

        console.log(data);
      })
    }
  }

}
