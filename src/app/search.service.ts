import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  search(terms: Observable<string> , searchType:string) {
  	// the searchType variable will either be 'movie' or 'user'
    return terms.pipe(
  		debounceTime(400),
  		distinctUntilChanged(),
  		switchMap(terms => {
        console.log(terms)
        if (searchType === 'movie') {
          return this.basicSearch(terms, 'search/movies')
        }
        return this.basicSearch(terms, 'search/users')
      })
  	)
  }

  basicSearch(terms, route) {
  	const params = new HttpParams()
        .set('terms', terms)

  	return this.http.get(route, {params})
  }

}
