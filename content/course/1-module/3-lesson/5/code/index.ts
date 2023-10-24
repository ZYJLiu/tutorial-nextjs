import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Generate keypair to use as address of mint account
const mint = new Keypair();

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Calculate minimum lamports for space required by mint account
const lamports = await getMinimumBalanceForRentExemptMint(connection);

// Instruction to create new account with space for new mint account
const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: wallet_1.publicKey,
  newAccountPubkey: mint.publicKey,
  space: MINT_SIZE,
  lamports,
  programId: TOKEN_PROGRAM_ID,
});

// Instruction to initialize mint account
const initializeMintInstruction = createInitializeMint2Instruction(
  mint.publicKey,
  2, // decimals
  wallet_1.publicKey, // mint authority
  wallet_1.publicKey, // freeze authority
);

// Build transaction with instructions to create new account and initialize mint account
const transaction = new Transaction().add(
  createAccountInstruction,
  initializeMintInstruction,
);

// Sign and send transaction
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [
    wallet_1, // payer
    mint, // mint address keypair
  ],
);

console.log(
  "Transaction Signature:",
  `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
);

console.log(
  "Mint Account:",
  `https://explorer.solana.com/address/${mint.publicKey.toString()}?cluster=devnet`,
);
