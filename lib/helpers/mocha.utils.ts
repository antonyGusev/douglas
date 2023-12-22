// import { logger } from './logger';
// import { attachFailedApplicationCondition, attachSuccessScrishotAllure } from '../reporter';

// import dotenv from 'dotenv';
// import dotenvExpand from 'dotenv-expand';

// let env;

// if (process.env.ENV) {
//   env = dotenv.config({ path: `${process.cwd()}/.env.${process.env.ENV}` });
// } else {
//   env = dotenv.config();
// }

// dotenvExpand.expand(env);

// const { MODE, REPORTER } = process.env;

// const mochaIt = global.it;

// const it = (itTitle: string, testFn: Function) => mochaIt(itTitle, decorateTest(itTitle, testFn));

// it.only = (itTitle: string, testFn: Function) => mochaIt.only(itTitle, decorateTest(itTitle, testFn));

// it.skip = (itTitle: string, testFn: Function) => mochaIt.skip(itTitle, decorateTest(itTitle, testFn));

// const decorateTest = (itTitle: string, testFn: Function) => {
//   return async function (this: any) {
//     try {
//       await testFn.call(this);

//       if (REPORTER === 'allure' && MODE !== 'parallel') {
//         await attachSuccessScrishotAllure(itTitle);
//       } 

//     } catch (error: any) {
//       if (error.toString().includes('AssertionError')) {
//         logger.error(`[ASSERTION: ${itTitle}]`);
//       } else {
//         logger.warn(`[BROKEN: ${itTitle}]`);
//       }

//       if (REPORTER === 'allure' && MODE !== 'parallel') {
//         await attachFailedApplicationCondition(itTitle);
//       } 

//       throw error;
//     }
//   }.bind(this);
// };

// export { it };
