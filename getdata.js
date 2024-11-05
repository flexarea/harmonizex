/* eslint-disable no-console */
// getdata.js

const db = require("./db");

async function getData() {
  try {
    const data = await db("api_data").select("*");
    console.log("Retrieved data:", data);
    return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}

// Example usage
getData();
