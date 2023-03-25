const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

exports.generatePartitionKey = (event) => {
  let candidate;

  candidate = event ? event.partitionKey || createHash(JSON.stringify(event)) : TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};