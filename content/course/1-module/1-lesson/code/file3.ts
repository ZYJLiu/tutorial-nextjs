import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getOrCreateKeypair } from "./utils";

(async () => {
  // Establish a connection to the Solana devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
})();
