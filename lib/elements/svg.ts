import { BaseElement, CanGetData } from '../base.elements';
import { logMessage, logger } from '../helpers';
import { pwLogging } from '../reporter';

type TGetDataArgs = {type: 'image', path: string} | null;

export interface ISVGElement {
  getData(data: TGetDataArgs): Promise<string>;
}

export class SVGElement extends CanGetData implements ISVGElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async getData(data: TGetDataArgs): Promise<any> {
    if (data && data.type === 'image') {
      return super.getData(data);
    }
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    logger.technical(logMessage(this, `getting data`));

    const result = await currentElement.innerHTML();
    logger.technical(logMessage(this, `got data: ${result}`));
    return result;
  }
}
