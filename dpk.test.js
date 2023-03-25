const { generatePartitionKey } = require("./dpk");
const partitionKey = "qwerty123";
const largePartitionKey = "c40c3f38b69ad98732273015e158676c59a0bc67a1e3d9a81dfd8d1afaef9f8fdafa9f27ae25140770e838abcba936e76eaf2f8557e68f935e152e9fe338a337c40c3f38b69ad98732273015e158676c59a0bc67a1e3d9a81dfd8d1afaef9f8fdafa9f27ae25140770e838abcba936e76eaf2f8557e68f935e152e9fe338a337c40c3f38b69ad98732273015e158676c59a0bc67a1e3d9a81dfd8d1afaef9f8fdafa9f27ae25140770e838abcba936e76eaf2f8557e68f935e152e9fe338a337";
const objectPartitionKey = { foo: "bar" };
const largeObject = { large: largePartitionKey }

describe("generatePartitionKey Test Suite", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = generatePartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a new partition key with SHA3-512 format for an object without a partitionKey attribute set", () => {
    const agent = { id: 1, name: "Ricardo Campos", role: "Doctor" }
    const result = generatePartitionKey(agent);
    expect(result).toHaveLength(128)
  })

  it("Returns the same partition key for a valid key", () => {
    const agent = { id: 1, name: "Ricardo Campos", role: "Doctor", partitionKey: partitionKey }
    const result = generatePartitionKey(agent);
    expect(result).toBe(partitionKey)
  })

  it("Replaces the partitionKey for a valid one when given one too large", () => {
    const agent = { id: 1, name: "Ricardo Campos", role: "Doctor", partitionKey: largePartitionKey }
    const result = generatePartitionKey(agent);
    expect(result).not.toBe(largePartitionKey);
  })

  it("Allows to use an stringify object as partitionKey", () => {
    const agent = { id: 1, name: "Ricardo Campos", role: "Doctor", partitionKey: objectPartitionKey }
    const result = generatePartitionKey(agent);
    expect(result).toBe(JSON.stringify(objectPartitionKey));
  })

  it("Replaces partitionKey when using a large object", () => {
    const agent = { id: 1, name: "Ricardo Campos", role: "Doctor", partitionKey: largeObject }
    const result = generatePartitionKey(agent);
    expect(result).not.toBe(JSON.stringify(largeObject));
    expect(result).toHaveLength(128)
  })
});