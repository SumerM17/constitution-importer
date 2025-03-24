
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INDIAN_STATES } from "@/lib/constants";

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

const StateSelector = ({ selectedState, onStateChange }: StateSelectorProps) => {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium mb-1">
        Select a State or Union Territory
      </label>
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a state..." />
        </SelectTrigger>
        <SelectContent>
          {INDIAN_STATES.map((state) => (
            <SelectItem key={state.code} value={state.code}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StateSelector;
