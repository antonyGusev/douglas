import { logger, isNull, stringifyValue, logMessage } from '../helpers';
import { pwLogging } from '../reporter';
import { BaseAbstraction } from './base.abstraction';


export abstract class AbstractComponent extends BaseAbstraction {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  protected initChild(child: any, selector: string, name: string) {
    logger.technical(logMessage(this, `init child: "${child.name}" by selector: "${selector}" as: "${name}"`));
    return new child(selector, name);
  }

  @pwLogging
  async sendKeys(data: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      logger.technical(logMessage(this, `sending values: ${stringifyValue(value)} to: ${key}`));

      await (this as Record<string, any>)[key].sendKeys(value);
      logger.technical(logMessage(this, `sent values: ${stringifyValue(value)} to: ${key}`));
    }
  }

  @pwLogging
  async clickOn(data: any) {
    for (const [key, value] of Object.entries(data)) {
      logger.technical(logMessage(this, `clicking on: ${key} ${stringifyValue(value)}`));

      await (this as Record<string, any>)[key].clickOn(value);
      logger.technical(logMessage(this, `clicked on: ${key} ${stringifyValue(value)}`));
    }
  }

  @pwLogging
  async getData(data: any) {
    const values = { ...data };

    for (const [key, value] of Object.entries(data)) {
      logger.technical(logMessage(this, `getting data from: ${key} ${stringifyValue(value)}`));

      values[key] = await (this as Record<string, any>)[key].getData(value);
    }

    logger.technical(logMessage(this, `got data: ${stringifyValue(values, undefined, 2)}`));
    return values;
  }

  @pwLogging
  async isVisible(data: any) {
    if (isNull(data)) {
      return this._page!.isVisible(this.selector);
    }

    logger.technical(logMessage(this, `checking that elements are visible`));

    const values = { ...data };

    for (const [key, value] of Object.entries(data)) {
      values[key] = await (this as Record<string, any>)[key].isVisible(value);
    }

    
    logger.technical(logMessage(this, `visibility are: ${stringifyValue(values, undefined, 2)}`));
    return values;
  }
}
