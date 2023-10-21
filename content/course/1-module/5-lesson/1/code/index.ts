import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Mint account address
const mint = new PublicKey("3HHWdM5mGqBwTjF9E3nddjmzVRS7RonAVqFwuq7D4c2C");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  wallet_1, // payer
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

console.log(
  "Associated Token Account: ",
  `https://explorer.solana.com/address/${associatedTokenAccount.toString()}?cluster=devnet`,
);
