import { TextField } from '@shared/ui/TextField/TextField';
import type { DateFieldProps } from '@shared/ui/TextField/TextField.types';

const DEFAULT_PLACEHOLDER = 'YYYY년 MM월 DD일';


export const DateField = ({ placeholder = DEFAULT_PLACEHOLDER, ...props }: DateFieldProps) => (
  <TextField type="date" placeholder={placeholder} {...props} />
);
