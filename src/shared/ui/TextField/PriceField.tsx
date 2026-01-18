import { TextField } from '@shared/ui/TextField/TextField';
import type { PriceFieldProps } from '@shared/ui/TextField/TextField.types';

export const PriceField = (props: PriceFieldProps) => <TextField type="price" {...props} />;
