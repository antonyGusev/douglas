import { IPlaywrightTestConfig, devices } from '../types';
import { selectBrowser } from './select.browser';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const { parsed } = require('dotenv').config();
const { MODE, WORKERS, RETRIES, BROWSERS, HEADLESS, TEST_TIMEOUT } = parsed;

export function buildConfig() {
  const config = {
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: RETRIES || process.env.CI ? 2 : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    timeout: TEST_TIMEOUT || 90000,
    reporter: [
      [
        'allure-playwright',
        {
          detail: true,
          outputFolder: 'allure-results',
          suiteTitle: false,
        },
      ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      headless: HEADLESS || false,
      trace: 'on-first-retry',
      video: 'on',
      screenshot: 'on',
      contextOptions: {
        recordVideo: {
          dir: './allure-results',
        },
      },
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
  };

  if (MODE === 'PARALLEL') {
    config.fullyParallel = true;
    config.workers = WORKERS || '50%';
  }

  if (BROWSERS) {
    config.projects = selectBrowser();
  }

  return config as IPlaywrightTestConfig;
}