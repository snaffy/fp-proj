import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html'
})
export class ProductFilterComponent implements OnInit {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm$ = new Subject<string>();
  searchValue = '';

  constructor(private  router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initSearchListener();
    this.rememberLastSearchedValue();
  }

  private initSearchListener(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(500)
    ).subscribe(searchBy => {
      this.router.navigate(['/products'], {queryParams: this.createQueryParam(searchBy), queryParamsHandling: 'merge'});
      this.searchForm$.next(searchBy);
    });
  }

  private createQueryParam(delayedValue): object {
    let qParam;
    if (!delayedValue) {
      qParam = {_q: null};
    } else {
      qParam = {_q: delayedValue};
    }
    return qParam;
  }

  private rememberLastSearchedValue(): void {
    this.searchValue = this.activatedRoute.snapshot.queryParamMap.get('_q') || '';
  }
}



