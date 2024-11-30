"use strict";

/**
 * CouchDB Client for interacting with a CouchDB database - couchdbUtils.js
 */
import { localDB, remoteDB, syncDatabases } from "@/db/pouchdbClient";

const couchdbUtils = {
  /**
   * Set up database synchronization between local and remote and ensure remote DB exists
   */
  setupDatabase: async () => {
    try {
      // Check if remote database exists
      const response = await fetch(`${remoteDB.name}`);
      if (response.status === 404) {
        // Create the database if it doesn't exist
        const createResponse = await fetch(`${remoteDB.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!createResponse.ok) {
          throw new Error("Failed to create remote database.");
        }
        console.log(`Database '${remoteDB.name}' created.`);
      } else {
        console.log(`Database '${remoteDB.name}' already exists.`);
      }

      // Initialize database synchronization
      syncDatabases();
      console.log("Database sync initialized.");
    } catch (error) {
      console.error("Error setting up database sync:", error.message);
    }
  },

  /**
   * Insert or update a document into the local database
   * @param {Object} doc - The document to insert or update
   */
  insertDocument: async (doc) => {
    try {
      const existingDoc = await localDB.get(doc._id).catch(() => null); // Check if the document exists
      if (existingDoc) {
        doc._rev = existingDoc._rev; // Add revision for updates
      }
      const response = await localDB.put(doc); // Insert or update the document
      console.log("Document inserted/updated:", response);
      return response;
    } catch (error) {
      console.error("Error inserting/updating document:", error.message);
      throw error;
    }
  },

  /**
   * Retrieve a document by ID from the local database
   * @param {string} docId - The document ID
   */
  getDocument: async (docId) => {
    try {
      const document = await localDB.get(docId);
      console.log("Document retrieved:", document);
      return document;
    } catch (error) {
      console.error("Error retrieving document:", error.message);
      throw error;
    }
  },

  /**
   * Delete a document by ID from the local database
   * @param {string} docId - The document ID
   */
  deleteDocument: async (docId) => {
    try {
      const doc = await localDB.get(docId); // Retrieve the current document
      const response = await localDB.remove(doc._id, doc._rev); // Delete the document
      console.log("Document deleted:", response);
      return response;
    } catch (error) {
      console.error("Error deleting document:", error.message);
      throw error;
    }
  },

  /**
   * Bulk update documents into the local database
   * @param {Array} docs - An array of documents to update/insert
   */
  bulkUpdate: async (docs) => {
    try {
      const response = await localDB.bulkDocs(docs); // Use PouchDB's bulkDocs API
      console.log("Bulk update completed:", response);
      return response;
    } catch (error) {
      console.error("Error during bulk update:", error.message);
      throw error;
    }
  },

  /**
   * Retrieve all documents from the local database
   */
  getAllDocuments: async () => {
    try {
      const response = await localDB.allDocs({ include_docs: true }); // Fetch all docs
      const documents = response.rows.map((row) => row.doc); // Extract docs
      console.log("All documents retrieved:", documents);
      return documents;
    } catch (error) {
      console.error("Error retrieving all documents:", error.message);
      throw error;
    }
  },

  /**
   * Replicate from local to remote database
   */
  replicateTo: async () => {
    try {
      await localDB.replicate.to(remoteDB);
      console.log("Replication to remote database completed.");
    } catch (error) {
      console.error("Replication to remote database failed:", error.message);
    }
  },

  /**
   * Replicate from remote to local database
   */
  replicateFrom: async () => {
    try {
      await localDB.replicate.from(remoteDB);
      console.log("Replication from remote database completed.");
    } catch (error) {
      console.error("Replication from remote database failed:", error.message);
    }
  },
};

export default couchdbUtils;
