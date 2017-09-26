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
  @Output() modalClickResult: EventEmitter<number>; //0 - cancel //1- ok //2-etc
  @Input() onCancelAction: Function;
  @Output() modalStateOpen: EventEmitter<boolean>;

  constructor() { 
    this.isOpen = false;
    this.size = "";
    this.modalClickResult = new EventEmitter<number>();
    this.modalClickResult.emit(0);
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
    this.modalClickResult.emit(1);
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
    this.modalClickResult.emit(0);
    this.isOpen = false;
    this.modalStateOpen.emit(false);
  }
}
