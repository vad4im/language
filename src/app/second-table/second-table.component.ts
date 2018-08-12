// https://stackblitz.com/edit/angular-material2-issue-gqmbva?file=app%2Fapp.component.ts
import {Component, OnInit} from '@angular/core';
import {VERSION} from '@angular/material';

@Component({
  selector: 'app-second-table',
  templateUrl: './second-table.component.html',
  styleUrls: ['./second-table.component.css']
})
export class SecondTableComponent  implements OnInit {

  version = VERSION + 'ST';
  settingsToChild = { pageStt: {pageSizeOptions: [1, 3, 9], showFirstLastButtons: true, pageSize: 3 },
                      sort: {active: 'id', direction: 'desc' },
                      cell: [ {name: 'id', def: 'ID'},
                              {name: 'designation', def: 'че-то'}],
                      row:  [ 'designation', 'id']
  };


  public state = [
    {id: '2', designation: 'c'},
    {id: '0', designation: 'a'},
    {id: '1', designation: 'w'},
    {id: '3', designation: 'e'},
    {id: '4', designation: 'r'},
    {id: '5', designation: 't'},
    {id: '6', designation: 'y'},
    {id: '7', designation: 'u'},
    {id: '8', designation: 'i'}
  ];
  ngOnInit() {
    console.log('second table component parent onInit');
    this.state = [
      {id: '32', designation: 'cer'},
      {id: '30', designation: 'areter'},
      {id: '31', designation: 'werger'},
      {id: '33', designation: 'areter'},
      {id: '34', designation: 'werger'}
    ];
  }
  public sendDataToChild(index: number): number {
    console.log('SecondTable parent sendDataToChild called');
    return 77;
}

  parentMessage() {
    const ww = this.version;
     return function(){
      console.log('SecondTable MESSAGE WORK  !!!!!!!!!!!!' + ww);
      // return ('SecondTable MESSAGE WORK  !!!!!!!!!!!!');
     }
  }


}

 // Copyright Google LLC All Rights Reserved.
 //
 // Use of this source code is governed by an MIT-style license that can be
 // found in the LICENSE file at https://angular.io/license
