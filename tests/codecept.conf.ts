exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:5183',
      show: false,
      windowSize: '1200x900',
      headless: process.env.CI === 'true',
      chrome: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
  },
  include: {
    I: './steps_file',
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
      './step_definitions/steps.ts',
      './step_definitions/auth.steps.ts',
      './step_definitions/partner.steps.ts',
      './step_definitions/top-ratings.steps.ts',
      './step_definitions/tournaments.steps.ts',
      './step_definitions/carousel.steps.ts',
      './step_definitions/rating.steps.ts',
      './step_definitions/users.steps.ts',
      './step_definitions/categories.steps.ts',
      './step_definitions/footers.steps.ts',
    ],
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    retryTo: {
      enabled: true,
    },
    eachElement: {
      enabled: true,
    },
    pauseOnFail: {},
    stepTimeout: {
      timeout: 300000,
    },
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    {
      pattern: 'wait.*',
      timeout: 0,
    },
    {
      pattern: 'amOnPage',
      timeout: 0,
    },
  ],
  tests: './*_test.ts',
  name: 'tests',
};
