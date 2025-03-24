"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useOperationContext } from "@/context/OperationContext";
import { useSelectedUseCase } from "@/context/SelectedUseCaseContext"; // Import the context

const UseCaseContainer: React.FC = () => {
  const { selectedOperations, finalSelectedUsecase } = useOperationContext(); // Already an array of Operation objects
  const { selectedUseCase, setSelectedUseCase } = useSelectedUseCase(); // Context hook


  const handleUseCaseClick = (useCase: any) => {
    console.log(finalSelectedUsecase);
    setSelectedUseCase(useCase);
    console.log("Selected Use Case Object:", useCase);
  };

  return (
    <Card className="p-2 shadow-md h-full flex flex-col ml-0.5">
      <CardContent className="flex flex-col h-full">
        <div className="border-b-2 pt-1 mb-1">
          <p className="text-lg font-semibold mb-2">Selected Use Cases</p>
        </div>

        <div className="overflow-y-auto pr-2 flex-1 max-h-120 thin-scrollbar">
          {selectedOperations && selectedOperations.length > 0 ? (
            <ul className="space-y-0">
              {selectedOperations.map((useCase, index) => (
                <li
                  key={useCase.use_case_id} // Assuming use_case_id is unique
                  className={`cursor-pointer py-2 px-1 transition-colors border-b last:border-none
                    ${
                      selectedUseCase?.use_case_id === useCase.use_case_id
                        ? "bg-[#f1f5f9]"
                        : "hover:bg-gray-50"
                    }`}
                  onClick={() => handleUseCaseClick(useCase)} // Send entire Operation object
                >
                  <span className="text-sm text-gray-800">
                    {useCase.use_case}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm h-full flex justify-center items-center">
              No use cases selected yet. Build your perfect admin panel by
              choosing the features that fit your workflow!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseContainer;
