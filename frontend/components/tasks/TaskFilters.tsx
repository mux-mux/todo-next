'use client';

import { FilterStatus } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

type TaskFiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (value: FilterStatus) => void;
  sortOrder: 'asc' | 'desc' | 'none';
  setSortOrder: (value: 'asc' | 'desc' | 'none') => void;
  children?: React.ReactNode;
};

export default function TaskFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  children,
}: TaskFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filterStatus}
          onValueChange={(val: FilterStatus) => setFilterStatus(val)}
        >
          <SelectTrigger className="w-[140px] bg-white cursor-pointer">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(val: 'asc' | 'desc' | 'none') => setSortOrder(val)}
        >
          <SelectTrigger className="w-[140px] bg-white cursor-pointer">
            <SelectValue placeholder="Sort by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">High to Low</SelectItem>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>

        {children}
      </div>
    </div>
  );
}
