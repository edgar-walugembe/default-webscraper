import { PlaywrightCrawler, log } from "crawlee";

import { router } from "./routes.js";

log.setLevel(log.LEVELS.DEBUG);

log.debug("Setting up crawler.");
const crawler = new PlaywrightCrawler({
  requestHandler: router,
});

await crawler.run(["https://www.autotrader.ca/"]);

// await crawler.exportData("./result.json");

// // Or work with the data directly.
// const data = await crawler.getData();
// console.table(data.items);
