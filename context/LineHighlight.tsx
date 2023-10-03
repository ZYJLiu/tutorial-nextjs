"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface LineHighlightContextProps {
  fileToHighlight: number;
  setFileToHighlight: Dispatch<SetStateAction<number>>;
  linesToHighlight: number[];
  setLinesToHighlight: Dispatch<SetStateAction<number[]>>;
}

const LineHighlightContext = createContext<
  LineHighlightContextProps | undefined
>(undefined);

interface LineHighlightProviderProps {
  children: ReactNode;
}

// Used to select the static code snippet and lines to highlight in the right panel
// Affects the "CodeViewer" component
export const LineHighlightProvider: React.FC<LineHighlightProviderProps> = ({
  children,
}) => {
  const [linesToHighlight, setLinesToHighlight] = useState<number[]>([]);
  const [fileToHighlight, setFileToHighlight] = useState<number>(0);

  return (
    <LineHighlightContext.Provider
      value={{
        fileToHighlight,
        setFileToHighlight,
        linesToHighlight,
        setLinesToHighlight,
      }}
    >
      {children}
    </LineHighlightContext.Provider>
  );
};

export const useLineHighlight = (): LineHighlightContextProps => {
  const context = useContext(LineHighlightContext);
  return context!;
};
