import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnChanges {
  @Input()
  order!: Order;
  @Input()
  readonly = false;
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

  // We cant using ngOnInIt it will trigger from getting to server and server sy changes arhy so ngOnChanges when we get order from server this will be called
  ngOnChanges(): void {
    if (!this.order) return; // agar order undefine then return warna next step initialize

    this.initializeMap();

    // this.addressLatLng means it has value
    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  // showing marker and disabling everything
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
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
    // server sy string mein arha so when its fixed just return db mein fixed ha
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8)); // we did it for mongodb as we made it fixed with 8 floating points
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  // if readonly true then show addressLatLng. Now you want to access it then you can using this. krke
  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
