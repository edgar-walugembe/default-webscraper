import { PlaywrightCrawler, log } from "crawlee";
import { Actor } from "apify";
import { router } from "./routes.js";

await Actor.init();

log.setLevel(log.LEVELS.DEBUG);

log.debug("Setting up crawler.");
const crawler = new PlaywrightCrawler({
  requestHandler: router,
});

await crawler.run(["https://www.autotrader.ca/"]);

await Actor.exit();
