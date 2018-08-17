import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ClausesKit} from '../clauseskit';
import { ClausesKitService } from '../clauses-kit.service';

import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-clauses-kit-list',
  templateUrl: './clauses-kit-list.component.html'
  // , styleUrls: ['./clauses-kit-list.component.css']
})
export class ClausesKitListComponent implements OnInit {
  selectedClausesKit: ClausesKit;
  clausesKit: Observable<{}>;

  settingsToChild = {  pageStt: {pageSizeOptions: [1, 3, 9]
                     , showFirstLastButtons: true
                     , pageSize: 3
                     },
    checkColumn: { name: 'check',
                   multiselect: false
                  },
    sort: {active: 'id', direction: 'desc' },
    cell: [ {name: 'id', def: 'ID'},
            {name: 'clausesName', def: 'Name'},
            {name: 'origLang', def: 'sLang'},
            {name: 'translLang', def: 'dLang'},
            {name: 'sourceUrl', def: 'URL'},
           ],
    sellVisible:  ['id', 'clausesName', 'origLang', 'translLang', 'sourceUrl' ]
  };
  buttonSetCurrent = { enable: false};
  constructor(private clausesKitService: ClausesKitService,
              private share: ClausesKitService) {
  }

  ngOnInit() {
    this.settingsToChild.sellVisible.unshift(this.settingsToChild.checkColumn.name);
    this.getClausesKit();
  }

  choiseEvent(data){
    this.buttonSetCurrent.enable = data.isSel;
    console.log(' Parent !!choise event!! enable is ' + this.buttonSetCurrent.enable);
  }

  setCurrent (){}

  getClausesKit() {
    this.clausesKit =  this.clausesKitService.getClausesKit();
  }

  getSelectedClausesKit(): ClausesKit {
    console.log('clauses_kit_list.get_selectedClause._id: ' + this.selectedClausesKit._id);
    return this.selectedClausesKit;
  }

  onSelect(clausesKit: ClausesKit): void {
    this.selectedClausesKit = clausesKit;
    console.log('clauses-kit-list.onSelect: ' + this.selectedClausesKit.clausesName + ' _id ' + this.selectedClausesKit._id);
    this.share.setCurrentKitName(this.selectedClausesKit);
  }

}
