export interface ISimpleListContainer  {
    primaryText: string;
    descriptorText: string;
    bottomText: string;
    sideText:string;
}

export class DetailedListContainer {
    primaryText: string;
    descriptorText: string;
    bottomText: string;
    sideText:string;
  
    constructor(primaryText: string = '', descriptorText: string = '', bottomText: string = '', sideText:string = '') {
      this.primaryText = primaryText;
      this.descriptorText = descriptorText;
      this.bottomText = bottomText;
      this.sideText = sideText;
    }
  }
