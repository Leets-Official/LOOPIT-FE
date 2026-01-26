import { MY_PAGE_PROFILE, PERSONAL_INFO_DEFAULTS } from '../mocks';

export type StoredProfile = {
  nickname: string;
  name: string;
  birthDate: string;
  email: string;
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

export const getProfileDefaults = (): StoredProfile => {
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

export const saveProfile = (values: StoredProfile) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
};
