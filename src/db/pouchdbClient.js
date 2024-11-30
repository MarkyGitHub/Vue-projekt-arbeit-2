"use strict";

import PouchDB from "pouchdb";
import couchDBCredentials from "@/config/couchDBCredentials";

// Local and Remote database instances
const localDB = new PouchDB(couchDBCredentials.dbName); // Local database instance
const remoteDB = new PouchDB(
  `${couchDBCredentials.url}/${couchDBCredentials.dbName}`,
  {
    auth: {
      username: couchDBCredentials.username,
      password: couchDBCredentials.password,
    },
  }
);

const ensureRemoteDatabaseExists = async () => {
  try {
    const response = await fetch(
      `${couchDBCredentials.url}/${couchDBCredentials.dbName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(
            `${couchDBCredentials.username}:${couchDBCredentials.password}`
          )}`,
        },
      }
    );

    if (response.ok) {
      console.log(`Remote database '${couchDBCredentials.dbName}' exists.`);
    } else if (response.status === 404) {
      console.log(
        `Remote database '${couchDBCredentials.dbName}' does not exist. Creating...`
      );
      await fetch(`${couchDBCredentials.url}/${couchDBCredentials.dbName}`, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${btoa(
            `${couchDBCredentials.username}:${couchDBCredentials.password}`
          )}`,
        },
      });
      console.log(
        `Remote database '${couchDBCredentials.dbName}' created successfully.`
      );
    } else {
      throw new Error(
        `Failed to access remote database: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error ensuring remote database exists:", error.message);
    throw error;
  }
};

// Function to sync databases in real-time
const syncDatabases = async () => {
  try {
    await ensureRemoteDatabaseExists(); // Ensure remote database exists before syncing

    localDB
      .sync(remoteDB, {
        live: true, // Keep syncing in real-time
        retry: true, // Retry if the connection is interrupted
      })
      .on("change", (info) => {
        console.log("Sync change:", info); // Log changes during sync
      })
      .on("paused", (err) => {
        console.log("Sync paused (possibly offline):", err);
      })
      .on("active", () => {
        console.log("Sync resumed.");
      })
      .on("denied", (err) => {
        console.error("Sync denied:", err); // Authentication or permission error
      })
      .on("complete", (info) => {
        console.log("Sync completed:", info);
      })
      .on("error", (err) => {
        console.error("Sync error:", err); // Handle errors
      });
  } catch (error) {
    console.error("Error during database sync:", error.message);
    throw error;
  }
};

export { localDB, remoteDB, syncDatabases };
