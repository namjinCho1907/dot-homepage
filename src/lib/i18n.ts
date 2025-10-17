import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface I18nState {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: 'ko',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'locale-storage',
    }
  )
);

export const languages = [
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'th', flag: '🇹🇭', name: 'ภาษาไทย' },
  { code: 'ne', flag: '🇳🇵', name: 'नेपाली' },
  { code: 'km', flag: '🇰🇭', name: 'ភាសាខ្មែរ' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
];
