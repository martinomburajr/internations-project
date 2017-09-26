import { SimpleListContainer } from '../../container/list/simple-list/simple-list.container.template';
import { SimpleMasterDetailContainer } from '../../container/master-detal/simple/master-detail-container';
import { Observable } from 'rxjs/Rx';
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'template-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailTemplate {

  @Input() private container: SimpleMasterDetailContainer;
  @Input() private action: Function

  constructor() {
      this.container = new SimpleMasterDetailContainer(); 
      //this.container.list$.subscribe(x=>console.log(x));
  }

  onButtonPress = () => {
    this.action();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['container']) {
    }
  }

}
