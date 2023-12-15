import { BaseElement, CanClick, CanGetData } from '../base.elements';
import { applyMixins, logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

export interface ICheckBoxElement {
  clickOn(data: boolean): Promise<void>;
  getData(data: any): Promise<string>;
}

export interface CheckBoxElement extends CanGetData, CanClick {}

export class CheckBoxElement extends BaseElement implements ICheckBoxElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: boolean): Promise<void> {
    const currentElement = (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `clicking`));

    await currentElement.setChecked(data);
    logger.technical(logMessage(this, `successfully clicked`));
  }
}

applyMixins(CheckBoxElement, [CanGetData, CanClick]);
