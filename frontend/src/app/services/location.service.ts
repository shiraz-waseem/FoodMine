import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrentLocation(): Observable<LatLngLiteral> {
    // anything change inside this method this observable can inform
    return new Observable((observer) => {
      // If browser does supports geographic of navigator just return out
      if (!navigator.geolocation) return;

      // If browser supports geolocation. First is success part hover so u can see. These part coming fronm javascript we are just wrapping around Observables as angular works around Observables
      // We can do using BehaviourSubject too but it was not neccessary its better to use behaviour subject in situations where you want to change value in different methods but here we just want to change in this method
      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
