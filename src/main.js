import { PlaywrightCrawler, log } from "crawlee";
import { Actor, Dataset } from "apify";
import { router } from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

await Actor.init();

log.setLevel(log.LEVELS.DEBUG);

log.debug("Setting up crawler.");

//Initialize a default dataset where data wil be stored
const dataset = await Dataset.open(process.env.DATASET_NAME);

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ request, page, log, enqueueLinks }) => {
    await router({ request, page, log, enqueueLinks, dataset });
  },
});

await crawler.run(["https://www.autotrader.ca/"]);

await Actor.exit();
