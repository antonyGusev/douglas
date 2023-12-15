import { ViewportSize, devices } from '@playwright/test';

const { BROWSERS } = process.env;

const BROWSERS_TO_RUN = {
  chromium: 'chromium',
  firefox: 'firefox',
  webkit: 'webkit',
  mobile_chrome: 'Mobile Chrome',
  mobile_safari: 'Mobile Safari',
  branded_chrome: 'Google Chrome',
  branded_edge: 'Microsoft Edge',
  modern: 'modern',
  mobile: 'mobile',
  branded: 'branded',
};

const browserNames = [
  'modern',
  'chromium',
  'firefox',
  'webkit',
  'mobile',
  'mobile_chrome',
  'mobile_safari',
  'branded',
  'branded_chrome',
  'branded_edge',
];

type TBrowserProp = {
  name: string;
  use: {
    viewport: ViewportSize;
    userAgent: string;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
  };
};

/* Test against mobile viewports. */
export const mobileBrowsers = [
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
];

/* Test against branded browsers. */
export const brandedBrowsers = [
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
  {
    name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
];

export const modernBrowsers = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

export function selectBrowesr(): TBrowserProp[] {
  const allBrowsers = [...mobileBrowsers, ...modernBrowsers, ...brandedBrowsers];

  if (BROWSERS === 'all') {
    return allBrowsers;
  }

  if (BROWSERS?.includes(',')) {
    const browsersArr = BROWSERS.split(',');

    if (Array.isArray(browsersArr)) {
      const brArr = [];

      for (const browser of browsersArr) {
        const br = allBrowsers.filter((b) => {
          return b.name === browser;
        });
        brArr.push(...br);
      }

      return brArr;
    }
  }

  const condition = Object.keys(BROWSERS_TO_RUN).find((browser) => browser === BROWSERS);

  if (!condition) {
    throw new Error(`Browser name is: ${BROWSERS}. Appropriate name for browser is: ${browserNames}`);
  }

  if (BROWSERS === 'modern') {
    return modernBrowsers;
  } else if (BROWSERS === 'mobile') {
    return mobileBrowsers;
  } else if (BROWSERS === 'branded') {
    return brandedBrowsers;
  } else {
    const result = allBrowsers.filter((browser) => {
      return browser.name === BROWSERS_TO_RUN[condition as keyof typeof BROWSERS_TO_RUN];
    });

    return result;
  }
}
