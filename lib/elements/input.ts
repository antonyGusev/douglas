import { CanGetData, CanSendKeys, BaseElement } from '../base.elements';
import { applyMixins, logMessage, logger } from '../helpers';

export type TInputGetData = null | 'placeholder' | 'type';

export interface IInputElement {
  sendKeys(data: string): Promise<void>;
  getData(data?: null | 'placeholder' | 'type'): Promise<string>;
}

export interface InputElement extends CanGetData, CanSendKeys {}

export class InputElement extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  async getData(data?: 'placeholder' | 'type') {
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `getting data`));

    let result;
    if (!!data) {
      result = await currentElement.getAttribute(data)
    } else {
      result = await currentElement.inputValue();
    }
    
    logger.technical(logMessage(this, `got data: ${result}`));
    return result;
  }
}

applyMixins(InputElement, [CanGetData, CanSendKeys]);
