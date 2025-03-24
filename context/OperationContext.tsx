"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Operation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
}

// interface OperationContextType {
//   selectedOperations: Operation[];
//   setSelectedOperations: (ops: Operation[]) => void;
//   finalSelectedUsecase: Operation[];
//   setFinalSelectedUsecase: (ops: Operation[]) => void;
// }


interface OperationContextType {
  selectedOperations: Operation[];
  setSelectedOperations: React.Dispatch<React.SetStateAction<Operation[]>>;
  finalSelectedUsecase: Operation[];
  setFinalSelectedUsecase: React.Dispatch<React.SetStateAction<Operation[]>>;
}


const OperationContext = createContext<OperationContextType | undefined>(
  undefined
);

export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);
  const [finalSelectedUsecase, setFinalSelectedUsecase] = useState<Operation[]>(
    []
  );

  return (
    <OperationContext.Provider
      value={{
        selectedOperations,
        setSelectedOperations,
        finalSelectedUsecase,
        setFinalSelectedUsecase,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export const useOperationContext = () => {
  const context = useContext(OperationContext);
  if (!context) {
    throw new Error(
      "useOperationContext must be used within OperationProvider"
    );
  }
  return context;
};
