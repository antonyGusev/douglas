import { logMessage, logger } from '../helpers';
import { logging, pwLogging } from '../reporter';
import { BaseElement } from './base.element';

export class CanSendKeys extends BaseElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  //@ts-ignore
  @pwLogging
  async sendKeys(value: string): Promise<void> {
    const currentElement = (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `sending keys: ${value}`));

    await currentElement.fill(value);
    logger.technical(logMessage(this, `got keys: ${value}`));
  }
}
