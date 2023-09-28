// "use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface LineHighlightContextProps {
  linesToHighlight: number[];
  setLinesToHighlight: Dispatch<SetStateAction<number[]>>;
}

const LineHighlightContext = createContext<
  LineHighlightContextProps | undefined
>(undefined);

interface LineHighlightProviderProps {
  children: ReactNode;
}

export const LineHighlightProvider: React.FC<LineHighlightProviderProps> = ({
  children,
}) => {
  const [linesToHighlight, setLinesToHighlight] = useState<number[]>([]);

  return (
    <LineHighlightContext.Provider
      value={{ linesToHighlight, setLinesToHighlight }}
    >
      {children}
    </LineHighlightContext.Provider>
  );
};

export const useLineHighlight = (): LineHighlightContextProps => {
  const context = useContext(LineHighlightContext);
  return context!;
};
