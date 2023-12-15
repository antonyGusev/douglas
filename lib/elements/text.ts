import { CanGetData } from '../base.elements';

export interface ITextElement {
  getData(data: any): Promise<string>;
}

export class TextElement extends CanGetData implements ITextElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }
}
