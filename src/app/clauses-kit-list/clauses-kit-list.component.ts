import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ClausesKit} from '../clauseskit';
import { ClausesKitService } from '../clauses-kit.service';
import {MatSort, VERSION, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-clauses-kit-list',
  templateUrl: './clauses-kit-list.component.html'
  // , styleUrls: ['./clauses-kit-list.component.css']
})
export class ClausesKitListComponent implements OnInit {
  selectedClausesKit: ClausesKit;
  clausesKit: ClausesKit[];

  settingsToChild = { pageStt: {pageSizeOptions: [1, 3, 9], showFirstLastButtons: true, pageSize: 3 },
    sort: {active: 'id', direction: 'desc' },
    cell: [ {name: 'id', def: 'ID'},
            {name: 'clausesName', def: 'Name'},
            {name: 'origLang', def: 'sLang'},
            {name: 'translLang', def: 'dLang'},
            {name: 'sourceUrl', def: 'URL'}
      ],
    row:  ['id', 'clausesName', 'origLang', 'translLang', 'sourceUrl' ]
  };

  constructor(private clausesKitService: ClausesKitService,
              private share: ClausesKitService) {}

  ngOnInit() {
    this.getClausesKit();
  }

  parentMessage() {
    return function(){
      const ww = this;
      console.log('ClausesKitList MESSAGE WORK  !!!!!!!!!!!!');
    }
  }

  sendDataToChild(event: any): number {
    console.log('ClausesKitList parent sendDataToChild called');
    return 1;
  }

  getSelectedClausesKit(): ClausesKit{
    console.log('clauses_kit_list.get_selectedClause._id: ' + this.selectedClausesKit._id);
    return this.selectedClausesKit;
  }

  onSelect(clausesKit: ClausesKit): void {
    this.selectedClausesKit = clausesKit;
    console.log('clauses-kit-list.onSelect: ' + this.selectedClausesKit.clausesName + ' _id ' + this.selectedClausesKit._id);
    this.share.setCurrentKitName(this.selectedClausesKit);
  }

  getClausesKit(): void {
    this.clausesKitService.getClausesKit()
      .subscribe(clausesKit => this.clausesKit = clausesKit);
  }

}
