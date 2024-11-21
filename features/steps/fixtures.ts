import { Browser, chromium, Page } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';
import { createLogger, format, transports } from 'winston';
import { TodoPage } from './TodoPage';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/test.log' }),
  ],
});

export default logger;


type Fixtures = {
  // set types of your fixtures

};
let page: Page;
let browser: Browser;
let retryCount: number;
export const test = base.extend<{ todoPage: TodoPage,}>({
  todoPage: ({ page }, use) => use(new TodoPage(page)),
  page: async ({ }, use) => {


    const capabilities = {
      'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': test.info().title,
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true
      }
    }

    browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })
    page = await browser.newPage()
    await use(page);
  },

});

export const { Given, When, Then, Before, After, BeforeAll, AfterAll } = createBdd(test);


BeforeAll(async function ({ $workerInfo, browser }) {
  logger.info('In before ALL')


});

Before(async function ({ }) {
  logger.info('In before ')
});

After(async function ({ $testInfo }) {
  logger.info('In After ' + $testInfo.status)
  let status = $testInfo.status;

  const img = await page.screenshot({
    path: `./test-results/screenshots/${$testInfo.testId}.png`,
    type: 'png',
  });

  // await $testInfo.attach($testInfo.testId, {
  //   body: img,
  //   contentType: "image/png"
  // });

  
  //$testInfo.attach('------------------------------------------------------------------');
  //$testInfo.attach('CURRENT PAGE URL: ' + page.url());
//   //$testInfo.attach('FAILED SCENARIO NAME: ' + pickle.name);
//   $testInfo.attach('------------------------------------------------------------------');

  try {
    // Mark the test as completed or failed
   
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: status } })}`)
   
  } catch {
  }

  await browser.close();
});


AfterAll(async function ({ }) {
  logger.info('In After ALL')

});
