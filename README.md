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
harmonize/
├── public/
│   ├── favicon.ico              # Site favicon
│   └── images/                  # Static images for the app
│       └── logo.png
├── src/
│   ├── components/              # Reusable React components
│   │   ├── setting.test.js      # testing for setting
│   │   ├── card.test.js         # testing for card 
│   │   ├── button.test.js       # testing for button
│   │   ├── setting.js           # App setting
│   │   ├── card.js              # Profile card with user information and album cover display
│   │   └── Button.js            # yes/no swipe buttons
│   ├── pages/                   # Next.js pages and API routes
│   │   ├── api/                 # API routes
│   │   │   └── user             # 
│   │   │         └── [id].js    # get data from db
│   │   ├── preference/          #
│   │   │   └── [id].js          # user preferences
│   │   ├── matches/             #
│   │   │   └── [id].js          # user's matches
│   │   ├── _app.js              # Load api data directly in app
│   │   ├── index.js             # main page (swipe interface)
│   │   ├── login.js             # login page
│   ├── styles/                  # CSS or SCSS files
│   │   ├── globals.css          # Global styles
│   │   ├── Home.module.css      # Styles specific to Home page
│   │   └── Navbar.module.css    # Component-specific styles
├── knex
│   ├── migrations/              # database
│   │   ├── migration.js           # db schema
├── .env.local                   # Environment variables
├── .gitignore                   # Git ignore file
├── next.config.js               # Next.js configuration file
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation

```
