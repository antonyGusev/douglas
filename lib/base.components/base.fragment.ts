import { AbstractComponent } from '../base.abstractions';

export interface BaseFragmentValues {
  [k: string]: any;
}

export class BaseFragment extends AbstractComponent {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  // async isRequiredItem(data: any) {
  //   const thisResult = await this.getData({ ...data });
  //   return Object.keys(data).every((key) => thisResult[key] === data[key]);
  // }
}
