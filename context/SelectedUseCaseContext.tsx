"use client";

import React, { createContext, useContext, useState } from "react";


export type OperationCategory =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "User";

// Import your Operation interface
export interface Operation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
  category: OperationCategory; // Assuming this is imported or defined elsewhere
}

// interface SelectedUseCaseContextType {
//   selectedUseCase: Operation | null;
//   setSelectedUseCase: (useCase: Operation) => void;
// }


interface SelectedUseCaseContextType {
  selectedUseCase: Operation | null;
  setSelectedUseCase: (useCase: Operation | null) => void;
}


const SelectedUseCaseContext = createContext<
  SelectedUseCaseContextType | undefined
>(undefined);

export const SelectedUseCaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedUseCase, setSelectedUseCase] = useState<Operation | null>(
    null
  );

  return (
    <SelectedUseCaseContext.Provider
      value={{ selectedUseCase, setSelectedUseCase }}
    >
      {children}
    </SelectedUseCaseContext.Provider>
  );
};

export const useSelectedUseCase = () => {
  const context = useContext(SelectedUseCaseContext);
  if (!context) {
    throw new Error(
      "useSelectedUseCase must be used within a SelectedUseCaseProvider"
    );
  }
  return context;
};
