/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

// Load environment variables
const dev = process.env.NODE_ENV !== "production";
const { DATABASE_URL } = loadEnvConfig("./", dev).combinedEnv;

// Common settings for migrations and seeds
const defaultSettings = {
  migrations: {
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
};

module.exports = {
  test: {
    ...defaultSettings,
    client: "pg",
    connection: async () => {
      const { PostgreSqlContainer } = await import("@testcontainers/postgresql");

      const container = await new PostgreSqlContainer("postgres:16").start();
      return {
        host: container.getHost(),
        port: container.getPort(),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
      };
    },
    seeds: {
      directory: "./knex/seeds/sample_user_data.js",
      directory: "./knex/seeds/sample_swipes_data.js",
    },
  },

  development: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: false, // Disable SSL for local development
    },
  },

  production: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // SSL for production
    },
  },
};
