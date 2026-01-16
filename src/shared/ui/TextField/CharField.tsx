import { TextField } from '@shared/ui/TextField/TextField';
import type { CharFieldProps } from '@shared/ui/TextField/TextField.types';

export const CharField = (props: CharFieldProps) => <TextField type="char" {...props} />;
