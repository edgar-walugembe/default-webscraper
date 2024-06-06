import { createPlaywrightRouter, Dataset } from "crawlee";

export const router = createPlaywrightRouter();

router.addHandler("DETAIL", async ({ request, page, log }) => {
  //when in the detail page
  log.debug(`Extracting data: ${request.url}`);

  const urlParts = request.url.split("/");
  const manufacturer = urlParts[4];

  const pdtName = await page.locator("h1.hero-title").textContent();

  const pdtStatus = await page.locator("span#spec-value-1").textContent();

  const pdtBodyType = await page.locator("span#spec-value-3").textContent();

  const pdtEngine = await page.locator("span#spec-value-4").textContent();

  const pdtDrivetrain = await page.locator("span#spec-value-7").textContent();

  const pdtPrice = await page.locator(".pa-current-asking-price").textContent();

  const pdtMileage = await page.locator(".ca-current-mileage").textContent();

  const results = {
    url: request.url,
    manufacturer,
    pdtName,
    pdtStatus,
    pdtMileage,
    pdtPrice,
    pdtBodyType,
    pdtEngine,
    pdtDrivetrain,
  };

  console.log(results);

  await Dataset.pushData(results);

  log.debug(`Saving data: ${request.url}`);
  await Dataset.pushData(results);
});

router.addHandler("CATEGORY", async ({ page, enqueueLinks, request, log }) => {
  //when in the bodyType page
  log.debug(`Enqueueing pagination for: ${request.url}`);

  const productSelector = ".dealer-split-wrapper > a";
  const nextPageSelector = "a.last-page-link";

  await page.waitForSelector(productSelector);
  await enqueueLinks({
    selector: productSelector,
    label: "DETAIL",
  });

  const nextButton = await page.$(nextPageSelector);
  if (nextButton) {
    await enqueueLinks({
      selector: nextPageSelector,
      label: "CATEGORY",
    });
  }
});

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  const linkableSelector = ".bodyTypeItem";

  await page.waitForSelector(linkableSelector);

  await enqueueLinks({
    selector: linkableSelector,
    label: "CATEGORY",
  });
});
