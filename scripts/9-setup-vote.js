import sdk from "./1-initialize-sdk.js";

/* The voting contract itself doesn’t have the ability to move our tokens around.
Because you created the token supply. Your wallet owns access to the entire supply. 
So only you have the power to access the supply, move tokens around, airdrop them, etc. 
Basically, this is a dictatorship haha. 

Here’s what we’re going to do — we’re going to transfer 90% of all our token to the voting 
contract. Once our token is moved to our voting contract, 
the voting contract itself will have access to the supply.*/

(async () => {
  try {
    // This is our governance contract.
    const vote = await sdk.getContract(
      "0x2E61Dacac6Bf95eB88C73117DD13FFA7AD42958B",
      "vote"
    );
    // This is our ERC-20 contract.
    const token = await sdk.getContract(
      "0x89bb562Cd8558191eCB3d324F96f3632331811c8",
      "token"
    );
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract(
      "0x2E61Dacac6Bf95eB88C73117DD13FFA7AD42958B",
      "vote"
    );
    // This is our ERC-20 contract.
    const token = await sdk.getContract(
      "0x89bb562Cd8558191eCB3d324F96f3632331811c8",
      "token"
    );
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(vote.getAddress(), percent90);

    console.log(
      "✅ Successfully transferred " + percent90 + " tokens to vote contract"
    );
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();
