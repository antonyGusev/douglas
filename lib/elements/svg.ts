import { BaseElement } from '../base.elements';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

export interface ISVGElement {
  getData(): Promise<string>;
}

export class SVGElement extends BaseElement implements ISVGElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async getData(): Promise<any> {
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `getting data`));

    const result = await currentElement.innerHTML();
    logger.technical(logMessage(this, `got data: ${result}`));
    return result;
  }
}
