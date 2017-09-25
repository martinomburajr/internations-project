
export interface ISimpleListContainer  {
    image: string;
    primaryText: string;
    sideText:string;
}

export class SimpleListContainer  {
    primaryText: string;
    sideText:string;
    image: string;
    classInfo: {};
  
    constructor(primaryText: string = '', sideText:string = '', image:string = '', classInfo:{} = {}) {
      this.primaryText = primaryText;
      this.sideText = sideText;
      this.image = image;
      this.classInfo = classInfo;
    }

    public static _LIST = {
        'list-group-item' : true,
        'list-group-item-action' : true,
        'flex-column' : true,
        'align-items-start' : true,
        'active' : false
    }

    public static _LIST_ACTIVE = {
        'list-group-item' : true,
        'list-group-item-action' : true,
        'flex-column' : true,
        'align-items-start' : true,
        'active' : true
    }
}