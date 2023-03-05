import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

// Governance token
/* Basically, a governance token allows users to vote on proposals. 
For example, a proposal may say something like “I want Naruto DAO to send 100,000 $HOKAGE 
to wallet address 0xf79a3bb8d5b93686c4068e2a97eaec5fe4843e7d for being an extraordinary member”. 
Then, members would vote on it.

Users with more governance token are more powerful. 
Usually, token is awarded to members of the community who have brought the most value.

For example, for the ENS airdrop, the people who were awarded the most token 
was the core dev team and active users in their Discord. But, you would have also received 
ENS DAO token based on how long you had held your ENS domain (ex. farza.eth). */

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenAddress = await sdk.deployer.deployToken({
      // What's your token's name? Ex. "Ethereum"
      name: "WoWDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "WOW",
      // This will be in case we want to sell our token,
      // because we don't, we set it to AddressZero again.
      primary_sale_recipient: AddressZero,
    });
    console.log(
      "✅ Successfully deployed token contract, address:",
      tokenAddress
    );
  } catch (error) {
    console.error("failed to deploy token contract", error);
  }
})();
