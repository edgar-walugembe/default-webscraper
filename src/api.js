// import { ApifyClient } from "apify-client";
// import dotenv from "dotenv";

// dotenv.config();

// (async () => {
//   const client = new ApifyClient({
//     token: process.env.APIFY_TOKEN_AUTOTRADER,
//   });

//   const datasetId = process.env.DATASET_ID_AUTOTRADER;

//   try {
//     // Delete the dataset
//     await client.httpClient.call({
//       url: `https://api.apify.com/v2/datasets/${datasetId}`,
//       method: "DELETE",
//     });

//     // Recreate the dataset
//     const newDataset = await client.httpClient.call({
//       url: `https://api.apify.com/v2/datasets`,
//       method: "POST",
//       data: {
//         name: datasetId,
//       },
//     });

//     console.log("Dataset cleared and recreated successfully");
//   } catch (error) {
//     console.error("Error clearing dataset:", error);
//   }
// })();

// import { ApifyClient } from "apify-client";
// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();

// (async () => {
//   const client = new ApifyClient({
//     token: process.env.APIFY_TOKEN_AUTOTRADER,
//   });

//   const datasetId = process.env.DATASET_ID_AUTOTRADER;

//   try {
//     const dataset = client.dataset(datasetId);

//     // Get all items
//     const { items } = await dataset.listItems();

//     if (items.length > 0) {
//       const lastItem = items[items.length - 1];

//       // Make a direct API call to delete the item
//       await axios.delete(
//         `https://api.apify.com/v2/datasets/${datasetId}/items/${lastItem.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.APIFY_TOKEN_AUTOTRADER}`,
//           },
//         }
//       );

//       console.log("Last item deleted:", lastItem);
//     } else {
//       console.log("The dataset is empty.");
//     }
//   } catch (error) {
//     console.error("Error deleting the last item:", error);
//   }
// })();

import { ApifyClient } from "apify-client";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN_AUTOTRADER,
  });

  const datasetId = process.env.DATASET_ID_AUTOTRADER;

  try {
    // Fetch dataset using client
    const dataset = client.dataset(datasetId);

    // Get all items
    const { items } = await dataset.listItems();

    // Check if there are any items
    if (items.length > 0) {
      console.log("Items in the dataset:", items); // Log items to inspect structure

      // Delete the last item in the dataset
      const lastItem = items[items.length - 1];

      // Delete the last item
      await client.datasets.deleteItem({
        datasetId: datasetId,
      });

      console.log("Last item deleted:", lastItem);
    } else {
      console.log("The dataset is empty.");
    }
  } catch (error) {
    console.error("Error deleting items:", error);
  }
})();
