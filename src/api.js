import { ApifyClient } from "apify-client";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN_AUTOTRADER,
  });

  const datasetId = process.env.DATASET_ID_AUTOTRADER;

  try {
    // Delete the dataset
    await client.httpClient.call({
      url: `https://api.apify.com/v2/datasets/${datasetId}`,
      method: "DELETE",
    });

    // Recreate the dataset
    const newDataset = await client.httpClient.call({
      url: `https://api.apify.com/v2/datasets`,
      method: "POST",
      data: {
        name: datasetId,
      },
    });

    console.log("Dataset cleared and recreated successfully");
  } catch (error) {
    console.error("Error clearing dataset:", error);
  }
})();
