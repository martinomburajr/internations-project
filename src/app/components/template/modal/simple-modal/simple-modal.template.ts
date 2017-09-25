import { SimpleModalContainer } from '../../../container/modal/simple-modal/simple-modal-container';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'simple-modal-template',
  templateUrl: './simple-modal.template.html',
  styleUrls: ['./simple-modal.template.scss']
})
export class SimpleModalTemplateComponent implements OnInit {

  @Input() size: string;
  @Input() isOpen: boolean;
  @Input() container: SimpleModalContainer;
  @Output() okClicked: EventEmitter<boolean>;
  @Output() cancelClicked: EventEmitter<boolean>;
  @Input() onCancelAction: Function;
  @Output() modalStateOpen: EventEmitter<boolean>;

  constructor() { 
    this.isOpen = false;
    this.size = "";
    this.okClicked = new EventEmitter<boolean>();
    this.okClicked.emit(false);
    this.cancelClicked = new EventEmitter<boolean>();
    this.cancelClicked.emit(false);
    this.container = new SimpleModalContainer();
    this.modalStateOpen = new EventEmitter<boolean>();
    this.modalStateOpen.emit(this.isOpen);
  }

  ngOnInit() {
  }

  /**
   * On okay modal click action.
   * 
   * 
   * @memberOf SimpleModalTemplateComponent
   */
  onOkClick() {
    this.okClicked.emit(true);
    this.isOpen = false;
    this.modalStateOpen.emit(false);
  }

  /**
   * On cancel modal click action;
   * 
   * 
   * @memberOf SimpleModalTemplateComponent
   */
  onCancelClick() {
    this.cancelClicked.emit(true);
    this.isOpen = false;
    this.modalStateOpen.emit(false);
  }
}
