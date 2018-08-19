import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Phrase } from './phrase';
import { ClausesKitListComponent } from './clauses-kit-list/clauses-kit-list.component';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({  providedIn: 'root'})
export class PhraseService {

  // private clausesUrl = 'api/clauses';  // URL to web api
  private clausesUrl = 'http://localhost:3000/clauses';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    // ,private clausesKitListComponent: ClausesKitListComponent
  ) { }


  getClauses(): Observable<Phrase[]> {
console.log('Phrase.service.getClauses ');
    return this.http.get<Phrase[]>(this.clausesUrl)
      .pipe(
        tap(clauses => this.log('fetched Clauses')),
        catchError(this.handleError('getClauses', []))
      );
  }
  getClausesOfRef(ref): Observable<Phrase[]> {
    console.log('Phrase.service.getClauses of KIT ');
    const url = `${this.clausesUrl}Ref/${ref}`;
    return this.http.get<Phrase[]>(this.clausesUrl)
      .pipe(
        tap(clauses => this.log('fetched Clauses by KIT Ref')),
        catchError(this.handleError('getClauses by kit Ref', []))
      );
  }


  deletePhrase (phrase: Phrase | number): Observable<Phrase> {
    console.log('Phrase.service.deletePhrase ');
    const id = typeof phrase === 'number' ? phrase : phrase._id;
    const url = `${this.clausesUrl}/${id}`;
    return this.http.delete<Phrase>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted phrase id=${id}`)),
      catchError(this.handleError<Phrase>('deletePhrase'))
    );
  }
  /** POST: add a new phrase to the server */
  addPhrase(phrase: Phrase): Observable<Phrase> {
console.log('Phrase.service.addPhrase: ' + phrase.orig + ' ' + phrase.clausesKitId );
    return this.http.post<Phrase>(this.clausesUrl,  phrase, httpOptions)
      .pipe(
        tap(phrase2 => this.log('added phrase w/ id=${phrase2.id}`')),
        catchError(this.handleError<Phrase>('addPhrase'))
      );
  }


  searchClauses(term: string): Observable<Phrase[]> {
    console.log('Phrase.service.searchClauses ');
    if (!term.trim()) {
      // if not search term, return empty phrase array.
      return of([]);
    }
    return this.http.get<Phrase[]>(`${this.clausesUrl}/?orig=${term}`).pipe(
      tap(_ => this.log(`found clauses matching "${term}"`)),
      catchError(this.handleError<Phrase[]>('searchClauses', []))
    );
  }

  /** GET phrase by id. Will 404 if id not found */
  getPhrase(id: number): Observable<Phrase> {
    console.log('Phrase.service.getPhrase ');
    const url = `${this.clausesUrl}/${id}`;
    return this.http.get<Phrase>(url).pipe(
      tap(_ => this.log(`fetched phrase id=${id}`)),
      catchError(this.handleError<Phrase>(`getPhrase id=${id}`))
    );
  }

  /** PUT: update the phrase on the server */
  updatePhrase (phrase: Phrase): Observable<any> {
    console.log('Phrase.service.updatePhrase ');
    return this.http.put(this.clausesUrl, phrase, httpOptions).pipe(
      tap(_ => this.log(`updated phrase id=${phrase.id}`)),
      catchError(this.handleError<any>('updatePhrase'))
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
