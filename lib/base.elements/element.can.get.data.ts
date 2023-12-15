import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';
import { BaseElement } from './base.element';

export class CanGetData extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async getData(data: any): Promise<any> {
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `getting data`));

    const result = (await currentElement.innerText()).trim();
    logger.technical(logMessage(this, `got data: ${result}`));
    return result;
  }
}
