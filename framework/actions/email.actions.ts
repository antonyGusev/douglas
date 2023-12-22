import { EmailHelper, EmailTypes, IEmailDataToGet, ITestInfo, browser, logger, pwLogging } from '../../lib';
import { BaseActions } from './base.actions';

const emailHelper = new EmailHelper();

export interface IEmailActions {
  getResetPasswordLink: (emailConfigName: EmailTypes, necessaryData?: IEmailDataToGet) => Promise<string>;
  openAssignNewPasswordPage: (url: string) => Promise<void>;
}

export class EmailActions extends BaseActions implements IEmailActions {
  
  constructor(testInfo: ITestInfo) {
    super(testInfo);
  }

  @pwLogging
  async getResetPasswordLink(emailConfigName: EmailTypes, necessaryData?: IEmailDataToGet) {
    const resetLinkPattern = /(?<=<a href=")(.*resetPassword.*)(?=\" title)/;
    const emailDataToGet: IEmailDataToGet = necessaryData || {
      receivedDate: '',
      senderName: '',
      senderAddress: '',
      subject: '',
      html: '',
    };

    const data = await emailHelper.getData(emailConfigName, emailDataToGet);
    const regExpResult = data.html?.match(resetLinkPattern);

    logger.technical(`Fetched restore link: ${regExpResult![0]}`);

    if (!regExpResult) {
      throw new Error(`Restore link does not correspond to regExp pattern: ${resetLinkPattern}`);
    }

    const resetPasswordLink = regExpResult[0];

    return resetPasswordLink;
  }

  @pwLogging
  async openAssignNewPasswordPage(url: string) {
    await browser.newPage(url);
  }
}
