/* eslint-disable no-console */
// collectAndStoreData.js

import fetch from "node-fetch"; // Install if not already installed
import db from "./db";

async function collectAndStoreData() {
  try {
    const response = await fetch("API_ENDPOINT_URL"); // put in actual api endpoint
    const apiData = await response.json();

    const dataToInsert = {
      field1: apiData.field1,
      field2: apiData.field2,
      field3: apiData.field3,
    };

    await db("api_data").insert(dataToInsert);
    console.log("API data collected and stored successfully.");
  } catch (error) {
    console.error("Error collecting or storing API data:", error);
  }
}

// Call the function
collectAndStoreData();
