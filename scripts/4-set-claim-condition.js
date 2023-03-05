import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

(async () => {
  try {
    const editionDrop = await sdk.getContract(
      "0x2C969Dca386d36527E2d8F9A5B8a034E3F62Bc1c",
      "edition-drop"
    );
    // We define our claim conditions, this is an array of objects because
    // we can have multiple phases starting at different times if we want to
    const claimConditions = [
      {
        // When people are gonna be able to start claiming the NFTs (now)
        startTime: new Date(),
        // The maximum number of NFTs that can be claimed.
        maxClaimable: 50_000,
        // The price of our NFT (free)
        price: 0,
        // The amount of NFTs people can claim in one transaction.
        maxClaimablePerWallet: 1,
        // We set the wait between transactions to unlimited, which means
        // people are only allowed to claim once.
        waitInSeconds: MaxUint256,
      },
    ];

    /* Our membership NFT has a tokenId of 0 since it's the first token in our ERC-1155 contract. 
    Remember — w/ ERC-1155 we can have multiple people mint the same NFT. 
    In this case, everyone mints an NFT w/ id 0. */
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Sucessfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
