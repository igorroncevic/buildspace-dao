import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract(
      "0x2C969Dca386d36527E2d8F9A5B8a034E3F62Bc1c",
      "edition-drop"
    );
    await editionDrop.createBatch([
      {
        name: "WowDAO Access Token",
        description: "This NFT will give you access to WowDAO!",
        image: readFileSync("scripts/assets/wowtoken.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
