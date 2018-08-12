import {Component, Input, OnInit} from '@angular/core';
import {ClausesKitService} from '../clauses-kit.service';
import {StatusBar} from '../statusBar';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  statusBar: StatusBar = new StatusBar;

  constructor(private share: ClausesKitService) {
    this.share.onClausesKitSetCurrent.subscribe(
      data  => this.statusBar.currentKitName = data.clausesName
    );
  }

  ngOnInit() {
  }
}
