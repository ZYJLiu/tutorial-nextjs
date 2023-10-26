import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createMint,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Mint account address
const mint = new PublicKey("3HHWdM5mGqBwTjF9E3nddjmzVRS7RonAVqFwuq7D4c2C");

// Get associated token account address
const associatedTokenAccountAddress = await getAssociatedTokenAddress(
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

// Instruction to create associated token account
const instruction = createAssociatedTokenAccountInstruction(
  wallet_1.publicKey, // payer
  associatedTokenAccountAddress, // token account address
  wallet_1.publicKey, // owner
  mint, // mint address
);

// Create transaction with instruction

// Sign and send transaction
