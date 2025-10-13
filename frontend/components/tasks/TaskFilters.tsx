'use client';

import { FilterStatus, TaskFiltersProps } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function TaskFilters({
  tasks,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  sortOrder,
  setSortOrder,
  children,
}: TaskFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="relative w-full">
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
          aria-label="Filter tasks done/undone/all"
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
          aria-label="Sort tasks asc/desc/none"
        >
          <SelectTrigger className="w-[140px] bg-white cursor-pointer">
            <SelectValue placeholder="Sort by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">High to Low</SelectItem>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="none">Unsorted</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterCategory}
          onValueChange={(value: string) => setFilterCategory(value)}
        >
          <SelectTrigger className="w-[140px] bg-white cursor-pointer">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {[...new Set(tasks.map((t) => t.category).filter(Boolean))].map(
              (cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        {children}
      </div>
    </div>
  );
}
