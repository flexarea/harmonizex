/* eslint-disable no-console */
// insertdata.js

const db = require("./db");

async function insertData(data) {
  try {
    await db("api_data").insert(data);
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

// Example usage
insertData({ field1: "value1", field2: "value2", field3: "value3" });
