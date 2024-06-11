import { ApifyClient } from "apify-client";
import pkg from "dotenv";
const { dotenv } = pkg;

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const dataset = client.dataset("scC24Sunhlc8hSu4U");

const { items } = await dataset.listItems();

for (const item of items) {
  console.log(item);
}
