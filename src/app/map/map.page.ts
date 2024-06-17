import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTitle } from '@ionic/angular/standalone';
import { MenuComponent } from '../components/menu/menu.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { LOCATIONS } from '../database/location_database';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, MenuComponent, ToolbarComponent, IonButton, IonButtons, IonSelect, IonItem, IonSelectOption, IonList, IonGrid, IonRow, IonCol, IonLabel]
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: any;
  locationSelector: string = "all";
  locations = LOCATIONS;
  showDetails:boolean = false;
  showIntro:boolean = true;
  displayedLocation: any = [];
  
  constructor() { }

  async ngOnInit() {
    await this.defaultMap();
    await this.addMarkers();
  }

  async defaultMap() {
    let latLng = new google.maps.LatLng(37.7080302, 13.2542708);
    let mapOptions = {
      center: latLng,
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  async addMarkers() {
    for (let i=0; i<this.locations.length; i++) {
      let marker = await new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: { lat: this.locations[i].lat, lng: this.locations[i].lng }
      });
      let infoWindow = new google.maps.InfoWindow({
        content: this.locations[i].venue
      });
      google.maps.event.addListener(marker, 'click', ()=> {
        infoWindow.open(this.map, marker);
      });
    }
  }

  selected() {
    let location = this.locationSelector
    if (location == "all"){
      // If ALL Location is selected
      let pos = { lat: 37.7080302, lng: 13.2542708 }
      this.map.setCenter(pos);
      this.map.setZoom(1);
      this.showDetails = false;
      this.showIntro = true;
    } else {
      // If Everything else is selected
      let index = this.locations.findIndex(x => x.id === location)
      let pos = { lat: this.locations[index].lat, lng: this.locations[index].lng }
      this.map.setCenter(pos);
      this.map.setZoom(15);
      this.showDetails = true;
      this.showIntro = false;
      this.displayedLocation = this.locations[index];
    }
  }
}
