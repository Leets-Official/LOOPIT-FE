import { TextField } from '@shared/ui/TextField/TextField';
import type { DateFieldProps } from '@shared/ui/TextField/TextField.types';

export const DateField = (props: DateFieldProps) => <TextField type="date" {...props} />;
