import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {SearchService} from 'app/api/dynamic-library/core-logic/utility/search/search.service';
import {AbstractService} from 'app/api/dynamic-library/core-logic/service/service.abstract';

@Component({
  selector: 'template-search-bar',
  templateUrl: 'search-bar.template.component.html'
})
export class SearchBarTemplate {

  @Input() private service: AbstractService<any>;
  @Input() private action: Function;
  @Input() private debounce: number;
  private searchText: string;
  private noResultsText: string;
  private selected: any
  private field: string;
  private value: string;

  constructor(private searchService: SearchService) {
    this.searchText = '';
    this.field = 'name';
    this.value = '';
    this.noResultsText = 'Sorry, nothing came up.'
    this.debounce = 300;
  }
    
  /**
   * What happens when a user selects an item they searched for
   * 
   * @param {any} $event 
   * 
   * @memberOf SearchBarTemplate
   */
  onSelectTypeAhead<R>($event, action: ($event) => R): R {
    this.selected = $event;
    return action($event)
  }
   
  
  /**
   * This performs the actual search itself. It requires a link to a suitable service that can do the appropriate search for the appropriate entity
   * 
   * @param {IGenericService<any>} entityService 
   * @returns {Observable<{}[]>} 
   * 
   * @memberOf SearchBarTemplate
   */
  search = (searchText: string): Observable<{}[]>  => {
    return this.searchService.searchGeneric(this.service,searchText)
  }
}