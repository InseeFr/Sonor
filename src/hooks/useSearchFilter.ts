import { FormEventHandler, useState } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type Filter = {
  campaigns: string[];
  ssech: string[];
  interviewer: string[];
  states: string[];
  contactOutcome: string[];
  priority: string[];
};

export const emptyFilter: Filter = {
  campaigns: [],
  ssech: [],
  interviewer: [],
  states: [],
  contactOutcome: [],
  priority: [],
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
    filters[name as keyof Filter].includes(value)
      ? setFilter({
          ...filters,
          [name]: [
            ...filters[name as keyof Filter].filter(f => {
              console.log(f !== value, f, value);
              return f !== value;
            }),
          ],
        })
      : setFilter({
          ...filters,
          [name]: [...filters[name as keyof Filter], value],
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
