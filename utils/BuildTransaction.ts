import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export enum TransactionType {
  Airdrop = "airdrop",
  Transfer = "transfer",
  CreateMint = "createMint",
}

export async function buildTransaction(
  type: TransactionType,
  pubkey: PublicKey,
) {
  switch (type) {
    case "transfer":
      return transfer(pubkey);
    case "createMint":
      return await createMint(pubkey);
    default:
      throw new Error("Invalid transaction type");
  }
}

function transfer(pubkey: PublicKey) {
  const toPubkey = new Keypair();
  const lamports = 0.1 * LAMPORTS_PER_SOL;

  const transferInstruction = SystemProgram.transfer({
    fromPubkey: pubkey,
    toPubkey: toPubkey.publicKey,
    lamports,
  });

  const transaction = new Transaction().add(transferInstruction);

  return transaction;
}

async function createMint(pubkey: PublicKey) {
  // Generate keypair to use as address of token account
  const mintKeypair = Keypair.generate();
  // Calculate minimum lamports for space required by mint account
  const lamports = await getMinimumBalanceForRentExemptMint(connection);

  // Instruction to create new account with space for new mint account
  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: pubkey,
    newAccountPubkey: mintKeypair.publicKey,
    space: MINT_SIZE,
    lamports: lamports,
    programId: TOKEN_PROGRAM_ID,
  });

  // Instruction to initialize mint account
  const initializeMintInstruction = createInitializeMint2Instruction(
    mintKeypair.publicKey,
    2, // decimals
    pubkey, // mint authority
    pubkey, // freeze authority
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  // Build transaction with instructions to create new account and initialize mint account
  const transaction = new Transaction({
    feePayer: pubkey,
    blockhash: blockhash,
    lastValidBlockHeight: lastValidBlockHeight,
  }).add(createAccountInstruction, initializeMintInstruction);

  transaction.sign(mintKeypair);

  return transaction;
}
