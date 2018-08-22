import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { EventEmitter} from '@angular/core';
import { ClausesKit } from './clausesKit';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ClausesKitService {

  private resourceUrl = 'http://localhost:3000/clauses-kit';  // URL to web api

  onClausesKitSetCurrent: EventEmitter<ClausesKit> = new EventEmitter<ClausesKit>();

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  public setCurrentKitName(clausesKit: ClausesKit) {
    this.log('Current Kit Name selected value is: ' + clausesKit.clausesName);
    this.onClausesKitSetCurrent.emit(clausesKit);
  }

  getClausesKit(): Observable<ClausesKit[]> {
    return this.http.get<ClausesKit[]>(this.resourceUrl)
      .pipe(
        tap(clauses => this.log('fetched Kit List')),
        catchError(this.handleError('getKitlist', []))
      );
  }
  /** POST: add a new phrase to the server */
  addClausesKit(clausesKit: ClausesKit): Observable<ClausesKit> {
    this.log('clauses kit add: ' + clausesKit.clausesName + ' ' + clausesKit.id );
    return this.http.post<ClausesKit>(this.resourceUrl,  clausesKit, httpOptions)
      .pipe(
        tap(data => this.log(`added kit w/ id=${data._id}`)),
        catchError(this.handleError<ClausesKit>('addClausesKit'))
      );
  }
  deleteClausesKit (clausesKit: ClausesKit): Observable<ClausesKit> {
    console.log('Phrase.service.deletePhrase ');
    const url = `${this.resourceUrl}/${clausesKit._id}`;
    return this.http.delete<ClausesKit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted phrase id=${clausesKit._id}`)),
      catchError(this.handleError<ClausesKit>('deleteClausesKIT'))
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
