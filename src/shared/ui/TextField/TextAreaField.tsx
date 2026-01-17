import { TextField } from '@shared/ui/TextField/TextField';
import type { TextAreaFieldProps } from '@shared/ui/TextField/TextField.types';

export const TextAreaField = (props: TextAreaFieldProps) => (
  <TextField type="textarea" {...props} />
);
