import * as React from "react";
import { RxCheck } from "react-icons/rx";
import { IoFilter } from "react-icons/io5";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ColumndFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  showCount?: boolean
  showSearch?: boolean
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  popoverContentCls?: string
}

export function ColumnFilter<TData, TValue>({
  column,
  title,
  options,
  showCount = true,
  showSearch = false,
  popoverContentCls = "",
}: ColumndFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="df">
          {title}
          <IoFilter />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-[180px] p-0", popoverContentCls)} align="start">
        <Command>
          {
            showSearch &&
            <CommandInput placeholder={title} />
          }

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const updatedValues = new Set(selectedValues);
                      if (isSelected) {
                        updatedValues.delete(option.value);
                      } else {
                        updatedValues.add(option.value);
                      }
                      const filterValues = Array.from(updatedValues);
                      column?.setFilterValue(
                        filterValues?.length ? filterValues : []
                      );
                    }}
                    className="flex items-center w-full px-2 py-1.5 text-sm"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <RxCheck className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="w-11/12 truncate">{option.label}</span>
                    {showCount && facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}