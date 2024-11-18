![workflow status](https://github.com/csci312-f24/project-camelshump/actions/workflows/node.js.yml/badge.svg)

# Project Skeleton

TODO: Implement CI badges, provide a link to the deployed version of your application, and provide a brief description of the application functionality.

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom cross-env
💻 npx install-peerdeps --dev eslint-config-airbnb
💻 npm install -D eslint-import-resolver-alias
```

Other dependencies installed with:

```
💻 npm install -S prop-types
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.

The project structure should look like this at first

```
project-root/
├── public/
│   └── ourImages/
│       ├── datingapp.jpg
│       └── [other images]
├── src/
│   ├── components/
│   │   ├── Dislikes.js
│   │   ├── Likes.js
│   │   ├── MainPage.js
│   │   ├── MatchItem.js
│   │   ├── MatchesList.js
│   │   ├── Profile.js
│   │   ├── SwipePage.js
│   │   ├── UserProfile.js
│   │   └── [other components]
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth].js
│   │   │   ├── spotify/
│   │   │   │   ├── auth.js
│   │   │   │   ├── callback.js
│   │   │   │   └── data.js
│   │   │   └── user/
│   │   │       └── index.js
│   │   ├── login/
│   │   │   ├── CustomIcons.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── SignIn.js
│   │   │   └── shared-theme/
│   │   ├── matches/
│   │   │   └── [id].js
│   │   ├── preference/
│   │   │   └── [id].js
│   │   └── swipeboard/
│   │       └── index.js
│   └── styles/
│       ├── globals.css
│       └── [other CSS modules]
├── package.json
└── tsconfig.json
```
