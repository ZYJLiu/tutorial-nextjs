import {
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");
const wallet_2 = getOrCreateKeypair("wallet_2");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Define the amount to transfer
const transferAmount = 0.1; // 0.1 SOL

// Create a transfer instruction for transferring SOL from wallet_1 to wallet_2
const transferInstruction = SystemProgram.transfer({
  fromPubkey: wallet_1.publicKey,
  toPubkey: wallet_2.publicKey,
  lamports: transferAmount * LAMPORTS_PER_SOL,
});

// Add the transfer instruction to a new transaction
