export interface UseCaseData {
  use_case: string;
  query: string;
  user_input_columns: string[];
}

export type OperationCategory = "Create" | "Read" | "Update" | "Delete" | "User";

export interface Operation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
  category: OperationCategory;
}
