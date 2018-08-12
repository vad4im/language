import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource';
import {ResourceService} from '../resource.service';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  currentResource: Resource;
  resourceList: Resource[];
  constructor(private resourceService: ResourceService ) { }

  ngOnInit() {
    this.getResource();
  }

  getResource(): void {
    this.resourceService.getResource()
      .subscribe(resourceList => this.resourceList = resourceList);
  }
}
