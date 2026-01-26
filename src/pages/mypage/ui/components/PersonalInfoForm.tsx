import { Button } from '@shared/ui/Button/Button';
import { TextField } from '@shared/ui/TextField/TextField';
import { useEffect, useState } from 'react';

export type PersonalInfoValues = {
  nickname: string;
  name: string;
  birthDate: string;
  email: string;
};

export type PersonalInfoFormProps = {
  defaultValues: PersonalInfoValues;
  onSave: (values: PersonalInfoValues) => void;
};

export const PersonalInfoForm = ({ defaultValues, onSave }: PersonalInfoFormProps) => {
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(values);
  };

  return (
    <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
      <TextField
        label="닉네임"
        value={values.nickname}
        onChange={(event) => setValues((prev) => ({ ...prev, nickname: event.target.value }))}
      />
      <TextField
        label="이름"
        value={values.name}
        onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
      />
      <TextField
        label="생년월일"
        type="date"
        value={values.birthDate}
        onChange={(event) => setValues((prev) => ({ ...prev, birthDate: event.target.value }))}
      />
      <TextField
        label="이메일"
        value={values.email}
        onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
      />

      <div className="mt-6 flex justify-end">
        <Button variant="fill" size="auto" type="submit">
          저장
        </Button>
      </div>
    </form>
  );
};
