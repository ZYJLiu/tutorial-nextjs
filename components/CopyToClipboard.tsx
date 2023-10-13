import { useEffect, useRef, useState } from "react";

import { copyToClipboard } from "@/utils/CopyToClipboard";

type Props = {
  children?: React.ReactNode;
};

export default function Pre({ children, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 400);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  };

  return (
    <div className="group relative">
      <pre {...props} ref={preRef} className="focus:outline-none">
        <div className="absolute right-4 top-3 m-2 flex items-center space-x-2">
          {/* <span
            className={`hidden text-xs text-green-400 fade-in ${
              copied ? "group-hover:flex" : ""
            }`}
          >
            Copied!
          </span> */}

          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={`hidden rounded-md border bg-transparent p-2 transition fade-in focus:outline-none group-hover:flex ${
              copied
                ? "border-green-400"
                : "hover:border-gray-500 focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50 dark:border-gray-700 dark:hover:border-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`pointer-events-none h-4 w-4 ${
                copied ? "text-green-400" : "text-gray-500 dark:text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                className={`${!copied ? "block" : "hidden"}`}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                className={`${copied ? "block" : "hidden"}`}
              />
            </svg>
          </button>
        </div>

        {children}
      </pre>
    </div>
  );
}
