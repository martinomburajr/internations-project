import { Observable } from 'rxjs/Rx';
import { SimpleListContainer } from '../../../container/list/simple-list/simple-list.container.template';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'template-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent implements OnInit {

  @Input() public action: Function
  @Input() public containers: Array<SimpleListContainer>;
  @Input() public startIndex: number;
  /**
   * Outputs changes to the index
   * 
   * @private
   * @type {EventEmitter<number>}
   * @memberOf SimpleListComponent
   */
  @Output() onIndexChanged: EventEmitter<number>;

  private currentIndex: number;
  
  constructor() {
    this.containers = new Array<SimpleListContainer>();
    if(this.startIndex) {
      this.currentIndex = this.startIndex;
    }else{
      this.currentIndex = 0;
    }
    this.onIndexChanged = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  onListItemClick(index: number) {
    this.onIndexChanged.emit(index);
    
    this.containers[this.currentIndex].classInfo = SimpleListContainer._LIST;
    this.containers[index].classInfo = SimpleListContainer._LIST_ACTIVE;
    this.currentIndex = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['containers']) {
      //this.initialiseAdaptiveViewModel();
    }
  }
}
