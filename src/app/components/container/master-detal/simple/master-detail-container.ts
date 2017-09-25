import { Observable } from 'rxjs/Rx';
import { SimpleListContainer } from '../../list/simple-list/simple-list.container.template';
export class SimpleMasterDetailContainer {
    title: string;
    image: any;
    mainDescription: string;
    subDescription: string;
    listTitle: string;
    list$: Observable<Array<SimpleListContainer>>;
    footer: string;

    constructor() {
        this.title = "";
        this.image = "";
        this.mainDescription = "";
        this.subDescription = "";
        this.footer;
        this.listTitle = "";
        this.list$ = new Observable<Array<SimpleListContainer>>(x=>x);
    }
}
