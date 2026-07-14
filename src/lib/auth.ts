import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";


const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
    throw new Error("Missing environment variable: MONGODB_URI");
}
if (!DB_NAME) {
    throw new Error("Missing environment variable: DB_NAME");
}
const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    emailAndPassword: {
        enabled: true
    },
});