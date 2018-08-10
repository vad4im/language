import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Resource } from './resource';

@Injectable({   providedIn: 'root' })

export class ResourceService {

  private resourceUrl = 'api/clauses';  // URL to web api

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  getResource(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourceUrl)
      .pipe(
        tap(clauses => this.log('fetched RESOURCE')),
        catchError(this.handleError('getResource', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a linguaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LinguaService: ${message}`);
  }

}
