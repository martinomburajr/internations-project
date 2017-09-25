import { SimpleListComponent } from '../simple-list/simple-list.component';
import { SingleTemplateAction } from '../../../action/single-action/single.template.action';
import { Component, Input, OnInit } from '@angular/core';
import {SimpleListContainer} from 'app/components/container/list/simple-list/simple-list.container.template';

@Component({
  selector: 'template-single-action-list',
  templateUrl: './single-action-list.component.html',
  styleUrls: ['./single-action-list.component.scss']
})
export class SingleActionListComponent extends SimpleListComponent implements OnInit {

  @Input() public primaryAction: Function;
  // @Input() public action: Function
  // @Input() public containers: Array<SimpleListContainer>;
  // @Input() public startIndex: number;

  constructor() { 
    super();
  }

  ngOnInit() {
  }

  onPrimaryAction = () => {
    //console.log('calling prim')
    //this.primaryAction();
  }

}
