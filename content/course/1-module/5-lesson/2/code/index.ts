import {
  Connection,
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

const mint = await createMint(
  connection,
  wallet_1, // payer
  wallet_1.publicKey, // mint authority
  wallet_1.publicKey, // freeze authority
  2, // decimals
);

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

const transaction = new Transaction().add(instruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [
    wallet_1, // payer
  ],
);

console.log(
  "Transaction Signature:",
  `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
);

console.log(
  "Associated Token Account: ",
  `https://explorer.solana.com/address/${associatedTokenAccountAddress.toString()}?cluster=devnet`,
);
