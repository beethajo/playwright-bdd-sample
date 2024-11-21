import { test as base, createBdd } from 'playwright-bdd';
import { createLogger, format, transports } from 'winston';

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

export const test = base.extend<{
 
}>({
  
});

export const { Given, When, Then, Before, After, BeforeAll, AfterAll } = createBdd(test);


BeforeAll(async function ({ }) {
  logger.info('In before ALL')
});

Before(async function ({ }) {
   logger.info('In before ')
});

After(async function ({ }) {
   logger.info('In After ')
});


AfterAll(async function ({ }) {
   logger.info('In After ALL')
});



// import { chromium, Browser, Page } from 'playwright';

// let browser: Browser;
// let page: Page;

// export const hooks = {
//   beforeAll: async () => {
//     browser = await chromium.launch({ headless: true });
//      logger.info('Browser launched');
//   },

//   beforeEach: async () => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//      logger.info('New page created');
//   },

//   afterEach: async () => {
//     await page.close();
//      logger.info('Page closed');
//   },

//   afterAll:async () => {
//     await page.close();
//      logger.info('Page closed');
//   }

// }