import sdk from "./1-initialize-sdk.js";

/* If you remember, you actually still hold “minting” rights on the ERC-20 contract. 
That means you can go and create more tokens if you wanted which may freak out members of your DAO lol. 
You could go and mint like a billion tokens to yourself lol.
It’s best if you revoke your “minting” role completely. */

(async () => {
  try {
    const token = await sdk.getContract(
      "0x89bb562Cd8558191eCB3d324F96f3632331811c8",
      "token"
    );
    // Log the current roles.
    const allRoles = await token.roles.getAll();

    console.log("👀 Roles that exist right now:", allRoles);

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log(
      "✅ Successfully revoked our superpowers from the ERC-20 contract"
    );
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();
