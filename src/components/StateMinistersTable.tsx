
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useStateMinistersData } from "@/hooks/useMinistersData";
import { INDIAN_STATES } from "@/lib/constants";

const StateMinistersTable = () => {
  const [stateFilter, setStateFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { ministers, departments, isLoading, error } = useStateMinistersData(stateFilter);
  
  // Filter ministers based on department and search query
  const filteredMinisters = React.useMemo(() => {
    if (!stateFilter) return [];
    
    return ministers.filter(minister => {
      const matchesDepartment = departmentFilter === "all" || minister.department === departmentFilter;
      const matchesSearch = minister.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           minister.portfolio.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [ministers, departmentFilter, searchQuery, stateFilter]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/3">
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map(state => (
                <SelectItem key={state.code} value={state.code}>{state.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {stateFilter && (
          <>
            <div className="w-full md:w-1/3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter} disabled={isLoading || !stateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search by name or portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading || !stateFilter}
              />
            </div>
          </>
        )}
      </div>
      
      {!stateFilter ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Please select a state to view ministers.</p>
        </div>
      ) : isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-legal-accent/20 border-t-legal-accent rounded-full mx-auto mb-4"></div>
          <p>Loading ministers data...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-destructive">
            Sorry, we couldn't load the ministers data.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Term</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMinisters.length > 0 ? (
                filteredMinisters.map((minister, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{minister.name}</TableCell>
                    <TableCell>{minister.department}</TableCell>
                    <TableCell>{minister.portfolio}</TableCell>
                    <TableCell>{minister.term}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No ministers found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StateMinistersTable;
