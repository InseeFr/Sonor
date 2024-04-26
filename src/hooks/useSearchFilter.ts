import { FormEventHandler, useState } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type Filter = {
  campaigns: string[];
  ssech: string[];
  interviewer: string[];
  states: string[];
  result: string[];
  priority: string[];
  all: { name: string; value: string }[];
};

export const emptyFilter: Filter = {
  campaigns: [],
  ssech: [],
  interviewer: [],
  states: [],
  result: [],
  priority: [],
  all: [],
};

const useSearchFilter = create(
  combine(emptyFilter, set => ({
    setFilter: (filter: Filter) => set(filter),
  })),
);

export function useSetSearchFilter() {
  return useSearchFilter(v => v.setFilter);
}

export function useGetSearchFilter() {
  return useSearchFilter(v => v);
}

export function useToggleSearchFilter() {
  const filters = useGetSearchFilter();
  const setFilter = useSetSearchFilter();
  return (name: string, value: string) => {
    filters[name as keyof Omit<Filter, "all">].includes(value)
      ? setFilter({
          ...filters,
          [name]: [
            ...filters[name as keyof Filter].filter(f => {
              return f !== value;
            }),
          ],
          all: [
            ...filters["all"].filter(f => {
              return f.value !== value;
            }),
          ],
        })
      : setFilter({
          ...filters,
          [name]: [...filters[name as keyof Filter], value],
          all: [...filters["all"], { name, value: value }],
        });
  };
}

export function useSearchForm(initialValue: Filter) {
  const [value, setValue] = useState(initialValue);
  const setFilter = useSetSearchFilter();
  const onReset: FormEventHandler = e => {
    e.preventDefault();
    setFilter(emptyFilter);
    setValue(emptyFilter);
  };
  return {
    value,
    onReset,
    useToggleSearchFilter,
    handler: (name: keyof Filter, clickedValue?: string) => {
      return () => setValue({ ...value, [name]: [...[name], clickedValue] });
    },
  };
}
