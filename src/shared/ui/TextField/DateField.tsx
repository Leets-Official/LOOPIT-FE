import { TextField } from '@shared/ui/TextField/TextField';
import type { DateFieldProps } from '@shared/ui/TextField/TextField.types';

const DEFAULT_PLACEHOLDER = '2026년 00월 00일';

export const DateField = ({ placeholder = DEFAULT_PLACEHOLDER, ...props }: DateFieldProps) => (
  <TextField type="date" placeholder={placeholder} {...props} />
);
