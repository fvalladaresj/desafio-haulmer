import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Story } from './Story';
import { Observable, zip } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private hackerNewsUrl = 'https://hacker-news.firebaseio.com/v0/';  // URL to web api

  constructor(private http: HttpClient) { }  

  /** GET best stories from API*/
  getStories(): Observable<Story[]> {
    const url = `${this.hackerNewsUrl}/beststories.json`;
    return this.http.get<string[]>(url)
      .pipe(
        concatMap(list => {
          const itemRequests = list.map(item => this.getStoryInfo(item))
          return zip(...itemRequests)
        }),
        catchError(error => {
          console.log('An error ocurred.')
          throw new Error(error)
        })
      );
  }

  /** */
  getStoryInfo(id: string): Observable<Story> {
    const url = `${this.hackerNewsUrl}/item/${id}.json`;
    return this.http.get<Story>(url)
      .pipe(
        catchError(error => {
          console.log('An error ocurred.')
          throw new Error(error)
        })
      );
  }

}

