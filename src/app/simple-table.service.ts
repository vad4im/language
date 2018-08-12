import { Injectable } from '@angular/core';
import { ClausesKitService} from './clauses-kit.service';

@Injectable({
  providedIn: 'root'
})
export class SimpleTableService {

  constructor(private clausesKitService: ClausesKitService) {}

  getClausesKitData() {
    // return  this.clausesKitService.getClausesKit();
    return  this.clausesKitService['getClausesKit']();

  }

}
