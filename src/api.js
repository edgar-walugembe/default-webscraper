import { ApifyClient } from "apify-client";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

(async () => {
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  const dataset = client.dataset("mRYqtaKghLbJxQSUl");

  const { items } = await dataset.listItems();

  for (const item of items) {
    console.log(item);
  }

  // console.log(items);
})();
