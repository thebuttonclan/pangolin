# Setup

- Clone this repository
- Run `yarn` to install package dependencies
- Run `yarn build` to compile all packages
- Run `yarn start` in an example app to test

```sh
yarn bootstrap
yarn llink
yarn build
```

## Storybook

To run locally, run `yarn llink` followed by `yarn storybook:<theme>` where theme is one of:

- base
- gov

To build, run `yarn llink` followed by `yarn build-storybook:<theme>` where theme is one of:

- base
- gov

To test build locally, run `npx http-server ./storybook-static` after building.

## Test

To run unit tests in all packages, run `yarn test:jest`
