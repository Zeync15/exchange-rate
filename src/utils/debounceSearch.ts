export const debounceSearch = (fn: (value: string) => void) => {
  let timeoutId: number;

  return (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(value), 500);
  };
};
