![workflow status](https://github.com/csci312-f24/project-camelshump/actions/workflows/node.js.yml/badge.svg)
# Project Setup

## Spotify API Setup

To run this project, each developer needs to set up their own Spotify Developer account and application:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:

   - App name: (choose any name)
   - App description: (brief description)
   - Redirect URI: `http://localhost:3000/api/auth/callback/spotify`
   - Website: `http://localhost:3000`

5. After creating the app, you'll get your Client ID and Client Secret
6. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

7. Fill in your `.env.local` with your Spotify app credentials:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate-a-random-string-here
   SPOTIFY_CLIENT_ID=your-client-id-from-spotify-dashboard
   SPOTIFY_CLIENT_SECRET=your-client-secret-from-spotify-dashboard
   ```

8. Generate a random string for NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Common Issues

- If you get an "OAuthCallback" error, check that:
  - Your Spotify app's redirect URI exactly matches `http://localhost:3000/api/auth/callback/spotify`
  - You've properly set up all environment variables
  - You're using your own Spotify application credentials, not someone else's

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

### Migrations to do before running app
   ```
   npx knex migrate:latest
   npx knex seed:run --specific=sample_user_data.js //run this seed file before the sample_swipes_data.js becuase of foreign key relation
   npx knex seed:run --specific=sample_swipes_data.js

   ```

### Common errors you might run into
 
 - watchpack error (Occurs due to corrupted file path and next doesnt know which path/socket to watch) so you just have to clear the cache by going to terminal and running 

  ```
  rm -rf .next

   ```
  
