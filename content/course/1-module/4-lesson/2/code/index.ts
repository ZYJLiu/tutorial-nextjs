import {
  ACCOUNT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Mint account address
const mint = new PublicKey("3HHWdM5mGqBwTjF9E3nddjmzVRS7RonAVqFwuq7D4c2C");

// Generate keypair to use as address of token account
const tokenKeypair = Keypair.generate();

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Calculate minimum lamports for space required by token account
const rentLamports =
  await connection.getMinimumBalanceForRentExemption(ACCOUNT_SIZE);

// Instruction to create new account with space for new token account
const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: wallet_1.publicKey,
  newAccountPubkey: tokenKeypair.publicKey,
  space: ACCOUNT_SIZE,
  lamports: rentLamports,
  programId: TOKEN_PROGRAM_ID,
});

// Instruction to initialize token account
const initializeAccountInstruction = createInitializeAccountInstruction(
  tokenKeypair.publicKey, // token account address
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

const transaction = new Transaction().add(
  createAccountInstruction,
  initializeAccountInstruction,
);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [
    wallet_1, // payer
    tokenKeypair, // token address keypair
  ],
);
