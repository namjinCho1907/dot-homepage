'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'km', name: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (newLocale: string) => {
    // 현재 경로에서 locale만 변경
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
