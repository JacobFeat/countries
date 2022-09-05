import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isSpinnerVisible = new BehaviorSubject<boolean>(true);

  turnOnSpinner() {
    this.isSpinnerVisible.next(true);
  }

  turnOffSpinner() {
    this.isSpinnerVisible.next(false);
  }
}
