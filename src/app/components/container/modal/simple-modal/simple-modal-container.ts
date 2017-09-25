import { lang } from 'moment';
export class SimpleModalContainer {
    title: string;
    body: string;
    classInfo: {};
    footer: string;

    constructor(title = 'Title', body = "Body", footer = "Footer", classInfo = {}) {
        this.title = title;
        this.body = body;
        this.classInfo = classInfo;
    }
}
