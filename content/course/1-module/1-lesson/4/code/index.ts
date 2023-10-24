import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"));

// Generate a new keypair
