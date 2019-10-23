import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MuseumDataService } from '../service/museum-data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  museumData = [];
  filteredMuseum = [];
  isfiltered: boolean;
  autocomplete: { input: string; };

  constructor(
    private router: Router,
    private museumSerivice: MuseumDataService,
    private geolocation: Geolocation
  ) {
    fetch('./assets/museum.json').then(res => res.json())
      .then(data => {
        this.museumData = data.museums;
        this.museumSerivice.setMuseums(this.museumData);
        this.autocomplete = { input: '' };
      });


      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords.latitude) 
        console.log(resp.coords.longitude) 
       }).catch((error) => {
         console.log('Error getting location', error);
       });
  }

  searchMaps(event) {
    if (event.target.value.length > 2) {
      const filteredJson = this.museumData.filter((row) => {
        if (row.state.indexOf(event.target.value) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      this.isfiltered = true;
      this.filteredMuseum = filteredJson;
    }
  }

  getMuseumDetails(museum) {
    this.museumSerivice.setMuseum(museum);
    this.router.navigate(['/museum-detail']);
  }

  allMuseumMap() {
    this.router.navigate(['/all-museum']);
  }
}
