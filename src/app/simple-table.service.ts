import { Injectable } from '@angular/core';
import { ClausesKitService} from './clauses-kit.service';

@Injectable({
  providedIn: 'root'
})
export class SimpleTableService {

  constructor(private clausesKitService: ClausesKitService) {}

  getClausesKitData(service: string, method: string) {
    // console.log('simpleTableService service: ' + service + ' method: ' + method);
    return  this[service][method]();

  }

}
