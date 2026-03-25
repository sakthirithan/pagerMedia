import { Inngest } from "inngest";
import User from "../models/user.js"
import connectDB from "../configs/db.js";


// Create a client to send and receive events
export const inngest = new Inngest({
  id: "pagermedia-app",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

// "CREATE" : Inngest Function to "CREATE" USER data to a Database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const email = email_addresses?.[0]?.email_address;
    if (!email) return;

    let username = email.split("@")[0];

    //Check availability of Username
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };
    await User.create(userData);
  },
);

// "UPDATE" : Inngest Function to "UPDATE" USER data in DataBase
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updatedUserData = {
      email: email,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };
    await User.findByIdAndUpdate(id, updatedUserData);
  },
);

// "DELETE" : Inngest Function to "DELETE" USER from DataBase
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
