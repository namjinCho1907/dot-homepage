// 국가 데이터 (Flutter 앱과 동일)
export const COUNTRIES = [
  { code: 'CN', flag: '🇨🇳', name: '중국', enName: 'China' },
  { code: 'VN', flag: '🇻🇳', name: '베트남', enName: 'Vietnam' },
  { code: 'NP', flag: '🇳🇵', name: '네팔', enName: 'Nepal' },
  { code: 'KH', flag: '🇰🇭', name: '캄보디아', enName: 'Cambodia' },
  { code: 'UZ', flag: '🇺🇿', name: '우즈베키스탄', enName: 'Uzbekistan' },
  { code: 'ID', flag: '🇮🇩', name: '인도네시아', enName: 'Indonesia' },
  { code: 'PH', flag: '🇵🇭', name: '필리핀', enName: 'Philippines' },
  { code: 'MM', flag: '🇲🇲', name: '미얀마', enName: 'Myanmar' },
  { code: 'TH', flag: '🇹🇭', name: '태국', enName: 'Thailand' },
  { code: 'MN', flag: '🇲🇳', name: '몽골', enName: 'Mongolia' },
  { code: 'US', flag: '🇺🇸', name: '미국', enName: 'United States' },
  { code: 'LK', flag: '🇱🇰', name: '스리랑카', enName: 'Sri Lanka' },
  { code: 'BD', flag: '🇧🇩', name: '방글라데시', enName: 'Bangladesh' },
  { code: 'JP', flag: '🇯🇵', name: '일본', enName: 'Japan' },
  { code: 'RU', flag: '🇷🇺', name: '러시아', enName: 'Russia' },
  { code: 'KZ', flag: '🇰🇿', name: '카자흐스탄', enName: 'Kazakhstan' },
  { code: 'TW', flag: '🇹🇼', name: '타이완', enName: 'Taiwan' },
  { code: 'IN', flag: '🇮🇳', name: '인도', enName: 'India' },
  { code: 'ET', flag: '🇪🇹', name: '에티오피아', enName: 'Ethiopia' },
  { code: 'MY', flag: '🇲🇾', name: '말레이시아', enName: 'Malaysia' },
  { code: 'FR', flag: '🇫🇷', name: '프랑스', enName: 'France' },
  { code: 'GB', flag: '🇬🇧', name: '영국', enName: 'United Kingdom' },
  { code: 'ZA', flag: '🇿🇦', name: '남아프리카', enName: 'South Africa' },
  { code: 'CA', flag: '🇨🇦', name: '캐나다', enName: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: '호주', enName: 'Australia' },
  { code: 'EG', flag: '🇪🇬', name: '이집트', enName: 'Egypt' },
  { code: 'DE', flag: '🇩🇪', name: '독일', enName: 'Germany' },
  { code: 'UA', flag: '🇺🇦', name: '우크라이나', enName: 'Ukraine' },
  { code: 'KR', flag: '🇰🇷', name: '한국', enName: 'South Korea' },
  { code: 'SG', flag: '🇸🇬', name: '싱가포르', enName: 'Singapore' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan', enName: 'Pakistan' },
  { code: 'OTHER', flag: '🌍', name: '기타', enName: 'Other' },
];

export const getCountryByCode = (code: string) => {
  return COUNTRIES.find((c) => c.code === code);
};

export const getCountryName = (code: string, locale: string = 'ko') => {
  const country = getCountryByCode(code);
  if (!country) return code;
  return locale === 'en' ? country.enName : country.name;
};

export const getCountryData = () => {
  return COUNTRIES;
};
