import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
  	return terms.pipe(
  		debounceTime(400),
  		distinctUntilChanged(),
  		switchMap(terms => this.basicSearch(terms))
  	)
  }

  basicSearch(terms) {
  	const params = new HttpParams()
        .set('terms', terms)

  	return this.http.get('search/basic', {params})
  }

}
