import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Museum } from '../models/museum.interfact';
import { MuseumDataService } from '../service/museum-data.service';

declare var google;

@Component({
  selector: 'app-museum-detail',
  templateUrl: './museum-detail.page.html',
  styleUrls: ['./museum-detail.page.scss'],
})
export class MuseumDetailPage implements OnInit {
  @ViewChild('map', {static: true}) mapContainer: ElementRef;
  map: any;
  //museum = {} as Museum;
  museum

  constructor(
    private geolocation: Geolocation,
    private museumSerivice: MuseumDataService) { }

  ngOnInit() {
    //this.museum = this.museumSerivice.getMuseum();
    //this.displayGoogleMap();


    this.geolocation.getCurrentPosition().then((resp) => {
      this.museum = resp.coords
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  displayGoogleMap() {
    const latLng = new google.maps.LatLng(this.museum.latitude, this.museum.longitude);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    //this.addInfoWindow(marker, this.museum.name + this.museum.state);
  }

  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  addMarkersToMap(museum) {
    const position = new google.maps.LatLng(museum.latitude, museum.longitude);
    const museumMarker = new google.maps.Marker({ position, title: museum.name });
    museumMarker.setMap(this.map);
  }
}
