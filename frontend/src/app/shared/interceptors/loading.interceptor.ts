import {
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { tap } from 'rxjs';

// global variable to handle multiple requests that goes to server we dont want to show multiple times loading
var pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  pendingRequests = pendingRequests + 1;

  return next(req).pipe(
    // we can use its output without changing value
    tap({
      next: (event) => {
        // if finished then
        if (event.type === HttpEventType.Response) {
          handleHideLoading();
        }
      },
      error: (_) => {
        handleHideLoading();
      },
    })
  );
  function handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0) loadingService.hideLoading();
  }
};
