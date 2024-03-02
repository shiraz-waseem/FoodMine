import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false); // Default value is false because by loading is by default fale
  // With this we can inform all the other components that using this service about the state of this loading

  constructor() {}

  // we can make method public above but its not good it breaks encapsulation so we by getting getting instance of loadingService and calling the showLoading and hideLoading we can call these methods

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  // we want this object not to be changed outside. So we define a getting that is of type observable by returning the subject as observable no one can change it outside
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
