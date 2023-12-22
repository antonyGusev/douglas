import { ITestInfo } from '../../lib';

export abstract class BaseActions {
  protected testInfo: ITestInfo;

  constructor(testInfo: ITestInfo) {
    this.testInfo = testInfo;
  }

  protected async attachScreenShot(screenshots: { name: string; body: Buffer }[]) {
    for (const screenshot of screenshots) {
      const { name, body } = screenshot;
      await this.testInfo.attach(name, { body, contentType: 'image/png' });
    }
  }
}
