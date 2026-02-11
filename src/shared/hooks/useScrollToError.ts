import type { FieldErrors, FieldValues } from 'react-hook-form';

export const useScrollToError = <T extends FieldValues>(fieldOrder: Array<keyof T>) => {
  const scrollToFirstError = (errors: FieldErrors<T>) => {
    const firstErrorField = fieldOrder.find((field) => errors[field]);
    if (!firstErrorField) {
      return;
    }

    const fieldName = String(firstErrorField);
    const element =
      document.querySelector(`[data-field="${fieldName}"]`) ??
      document.querySelector(`[name="${fieldName}"]`) ??
      document.getElementById(fieldName);

    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return { scrollToFirstError };
};
