import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {

  @Input() entity: GroupEntity;
  constructor() { }

  ngOnInit() {
  }

}
