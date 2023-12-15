import mailNotifier from 'mail-notifier';
import { pwLogging } from '../reporter';
import { logger } from './logger';

const {PASS} = process.env

interface IEmailDataToGet {
  senderName?: string;
  senderAddress?: string;
  receiversArray?: string;
  attachmentsArray?: string;
  receivedDate?: string;
  subject?: string;
  priority?: string;
  text?: string;
  html?: string;
}

interface IEmailData {
  senderName?: string;
  senderAddress?: string;
  receiversArray?: IEmailReceipient[];
  attachmentsArray?: IEmailAttachment[];
  receivedDate?: string;
  subject?: string;
  priority?: string;
  text?: string;
  html?: string;
}

interface IEmailReceipient {
  address: string;
  name: string;
}

interface IEmailAttachment {
  contentType: string;
  fileName: string;
  contentDisposition: string;
  transferEncoding: string;
  generatedFileName: string;
}

interface IMailConfig extends mailNotifier.Config {
  user: string;
  password: string;
  host: 'imap.gmail.com';
  port: 993; // imap port
  tls: boolean; // use secure connection
  tlsOptions: {
    rejectUnauthorized: boolean
  };
  markSeen: boolean;
}

interface IMailContent extends mailNotifier.EmailContent {}

// getter with appropriate name should exist in EmailHelper for every one of these Types
enum EmailTypes {
  antonGmail = 'antonGmail',
}

class EmailHelper {
  private connected: mailNotifier.Notifier | undefined
  constructor(private notifier = mailNotifier) {}

  @pwLogging
  async getData(configName: EmailTypes, dataToGet: IEmailDataToGet) {
    const email = await this.getEmail((this as unknown as Record<string, IMailConfig>)[configName], dataToGet)
    await this.closeConnection()

    return email as IEmailData;
  }

  private async getEmail(mailConfig: IMailConfig, dataToGet: IEmailDataToGet) {
    return new Promise((resolve, reject) => {
      try {
        logger.technical(`Connecting to Email Server with config ${JSON.stringify(mailConfig, null, 2)}`)
        this.connected = this.notifier(mailConfig);
        this.connected.on('mail', (mail: IMailContent) => {
          logger.technical(`Email helper successfully got last ureaded email`);
          resolve(this.formFileds(mail, dataToGet))
        }).start()
      } catch (error) {
        reject(error)
      }
    })
  }

  private async closeConnection() {
    return new Promise((resolve) => {
      if (this.connected) {
        this.connected.stop();
        this.connected.on('end', () => {
          logger.technical(`Email helper successfully closed connection`);
        })
      }
      resolve(0)
    }).catch(err => logger.error(err));
  }

  private formFileds(mail: IMailContent, dataToGet: IEmailDataToGet) {
    const keysToGet = Object.keys(dataToGet);

    const map = {
      senderName: mail.from[0].name,
      senderAddress: mail.from[0].address,
      receiversArray: mail.cc,
      attachmentsArray: mail.attachments,
      receivedDate: mail.date,
      subject: mail.subject,
      priority: mail.priority,
      text: mail.text,
      html: mail.html,
    };

    return keysToGet.reduce((acc: any, cur: any) => {
      acc[cur] = (map as Record<string, any>)[cur];
      return acc;
    }, {});
  }

  private get antonGmail(): IMailConfig {
    return {
      user: 'a.husiev.test@gmail.com',
      password: PASS!,
      host: 'imap.gmail.com',
      port: 993, // imap port
      tls: true, // use secure connection
      tlsOptions: { rejectUnauthorized: false },
      markSeen: true,
    };
  }
}

export { EmailHelper, IEmailDataToGet, EmailTypes };
