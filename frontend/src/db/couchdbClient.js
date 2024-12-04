"use strict";

import nano from "nano";
import couchDBCredentials from "@/config/couchDBCredentials.js";

const couchdb = nano({
  url: couchDBCredentials.url,
  requestDefaults: {
    auth: {
      user: couchDBCredentials.username,
      pass: couchDBCredentials.password,
    },
  },
});

export { couchdb, couchDBCredentials };
