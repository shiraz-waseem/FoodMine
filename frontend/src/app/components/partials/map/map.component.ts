import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  latLng,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Input()
  order!: Order;

  private readonly MARKER_ZOOM_LEVEL = 16; // When you show the marker on screen we need to setView
  // default bhi huta but its not good use this one
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42], // icon ke neeche wala circle
  });

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]; // default location. You can set another place

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker; // we dont want to have more then one marker on the screen so we will use it

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return; //Its mean the map has some value so return

    // Make sure leaflet wala hu. First param is it needs element
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false, // it will not show the leaflet on bottom right of map
    }).setView(this.DEFAULT_LATLNG, 1); // this is default location. 1 is Zoom level and 1 of Zoom level means show the whole world

    // Now how we want to show the map. As you know peak map consist of small images and they join together as tiles and makes whole map

    // free of cost. This is default
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        // console.log(latlng);
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  // LatLngExpression is lia use kia ke LatLng has alt and alots of functions but LatLngExpression can be LatLng | LatLngLiteral | LatLngTuple;
  setMarker(latlng: LatLngExpression) {
    // after making the set methods
    this.addressLatLng = latlng as LatLng;

    // if current market already available
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
      // return this.currentMarker.setLatLng(latlng); upper wala ka mtlb
    }

    // if not available. After this put in findMyLocation
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    // since upper draggable banaya we need to listen it too. For now you will get error pass the order from checkout page
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8)); // we did it for mongodb as we made it fixed with 8 floating points
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }
}
