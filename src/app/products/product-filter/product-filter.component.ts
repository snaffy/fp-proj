import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, of, Subject, Subscription} from 'rxjs';
import {debounceTime, delay, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html'
})
export class ProductFilterComponent implements OnInit {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm$ = new Subject<string>();

  constructor() {
  }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(500)
    ).subscribe(delayedValue => {
      this.searchForm$.next(delayedValue);
    });
  }

}



