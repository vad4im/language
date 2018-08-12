import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { EventEmitter} from '@angular/core';
import { ClausesKit } from './clauseskit';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})

export class ClausesKitService {

  private resourceUrl = 'http://localhost:3000/clauses-kit';  // URL to web api

  onClausesKitSetCurrent: EventEmitter<ClausesKit> = new EventEmitter<ClausesKit>();

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  public setCurrentKitName(clausesKit: ClausesKit) {
    this.onClausesKitSetCurrent.emit(clausesKit);
    console.log('clauses-kit.service.setCurrentKitName: ' + clausesKit.clausesName);
  }

  // getClausesKit(): Observable<ClausesKit[]> {
  //   this.messageService.add ('PhraseService: fetched clausesKit');
  //   return of(CLAUSES_KIT_LIST);
  // }

  getClausesKit(): Observable<ClausesKit[]> {
    return this.http.get<ClausesKit[]>(this.resourceUrl)
      .pipe(
        tap(clauses => this.log('fetched Kit List')),
        catchError(this.handleError('getKitlist', []))
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