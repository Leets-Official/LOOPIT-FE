import { type PersonalInfoValues } from '@shared/types/mypage';
import { MY_PAGE_PROFILE, PERSONAL_INFO_DEFAULTS } from '../mocks';

export type StoredProfile = PersonalInfoValues & {
  profileImage?: string;
};

const STORAGE_KEY = 'myPageProfile';

const readProfileStorage = (): Partial<StoredProfile> | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as Partial<StoredProfile>;
  } catch {
    return null;
  }
};

export const getPersonalInfoDefaults = (): PersonalInfoValues => {
  const stored = readProfileStorage();
  return {
    ...PERSONAL_INFO_DEFAULTS,
    ...stored,
  };
};

export const getProfileSummary = () => {
  const stored = readProfileStorage();
  return {
    ...MY_PAGE_PROFILE,
    ...stored,
  };
};

export const saveProfile = (values: Partial<StoredProfile>) => {
  if (typeof window === 'undefined') {
    return;
  }
  const stored = readProfileStorage() ?? {};
  const next = {
    ...stored,
    ...values,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};
