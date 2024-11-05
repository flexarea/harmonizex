// db.js

// eslint-disable-next-line import/no-extraneous-dependencies
import knex from "knex";
import knexConfig from "./knexfile";

const db = knex(knexConfig);

export default db;
