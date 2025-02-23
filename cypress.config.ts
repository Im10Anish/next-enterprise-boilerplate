import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      coverage(on, config);

      // Screenshot on failure
      on('after:screenshot', (details) => {
        console.log('Screenshot captured:', details.path);
      });

      // Video compression
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          return {
            compressionSpeed: 1,
            compression: 32,
          };
        }
      });

      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videoCompression: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      coverage(on, config);
      return config;
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
  env: {
    apiUrl: 'http://localhost:3000/api',
    coverage: true,
  },
});
