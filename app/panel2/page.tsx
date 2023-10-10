"use client";

// Test static page with line highlighting
// TODO: figure out how to change layouts within lesson sections
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import CodeViewer from "@/components/CodeViewer";
import Doc from "./doc.mdx";
import Panels from "@/components/Panels";
import { useLineHighlight } from "@/context/LineHighlight";

export default function StaticContent() {
  const [currentFile, setCurrentFile] = useState(files[0]);

  const language = "javascript";

  const { linesToHighlight, fileToHighlight } = useLineHighlight();

  useEffect(() => {
    if (fileToHighlight != null && fileToHighlight < files.length) {
      setCurrentFile(files[fileToHighlight]);
    }
  }, [fileToHighlight]);

  return (
    <main className="h-[90vh] p-1">
      <Panels
        LeftPanel={<Doc />}
        RightTopPanel={
          <Tabs
            variant={"bordered"}
            selectedKey={currentFile.name}
            onSelectionChange={(name) =>
              setCurrentFile(files.find((file) => file.name === name)!)
            }
          >
            {files.map((file) => (
              <Tab key={file.name} title={file.name}>
                <CodeViewer
                  language={language}
                  code={currentFile.content}
                  linesToHighlight={linesToHighlight}
                />
              </Tab>
            ))}
          </Tabs>
        }
        RightBottomPanel={
          <div>
            Custom Content for Right Bottom Panel, TBD if needed for static page
          </div>
        }
      />
    </main>
  );
}

// placeholder files
const files = [
  {
    name: "index.ts",
    content: `import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Generate a new keypair
const wallet_1 = new Keypair();

// Request the airdrop
const transactionSignature = await connection.requestAirdrop(
  wallet_1.publicKey,
  5 * LAMPORTS_PER_SOL,
);

// Get the most recent blockhash
const { blockhash, lastValidBlockHeight } =
  await connection.getLatestBlockhash();

// Confirm the airdrop transaction
await connection.confirmTransaction(
  {
    blockhash,
    lastValidBlockHeight,
    signature: transactionSignature,
  },
  "confirmed",
);

// Retrieve and log the new balance of each wallet after the transfer
const postBalance = await connection.getBalance(wallet_1.publicKey);
console.log("wallet_1 balance:", postBalance / LAMPORTS_PER_SOL);
`,
  },
  {
    name: "file 2",
    content: `function HelloWorld() {
    console.log('Hello, World!');
    console.log('Hello, World!');
  }`,
  },
  {
    name: "file 3",
    content: `function HelloWorld() {
    console.log('Hello, World!');
  }`,
  },
];
