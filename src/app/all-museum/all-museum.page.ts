import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MuseumDataService } from '../service/museum-data.service';
declare var google;

@Component({
  selector: 'app-all-museum',
  templateUrl: './all-museum.page.html',
  styleUrls: ['./all-museum.page.scss'],
})
export class AllMuseumPage implements OnInit {
  @ViewChild('map', {static: true}) mapContainer: ElementRef;
  map: any;
  museumData = [];

  constructor(
    private geolocation: Geolocation,
    private museumSerivice: MuseumDataService) { }

  ngOnInit() {
    this.museumData = this.museumSerivice.getMuseums();
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    const latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    const mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < this.museumData.length; _i++) {
      if (_i > 0) {
        this.addMarkersToMap(this.museumData[_i]);
      }
    }
  }

  addMarkersToMap(museum) {
    const position = new google.maps.LatLng(museum.latitude, museum.longitude);
    const museumMarker = new google.maps.Marker({ position, title: museum.name });
    museumMarker.setMap(this.map);
  }
}
