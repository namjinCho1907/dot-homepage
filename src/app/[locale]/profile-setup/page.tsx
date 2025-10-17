'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { COUNTRIES, getCountryName } from '@/lib/countries';
import { profileService } from '@/lib/profile';

export default function ProfileSetupPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { user } = useAuthStore();

  const [nickname, setNickname] = useState('');
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('OTHER');
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleNicknameChange = (value: string) => {
    setNickname(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!value) {
      setIsNicknameValid(false);
      setNicknameError('');
      return;
    }

    if (value.length < 2) {
      setIsNicknameValid(false);
      setNicknameError(t('닉네임은 최소 2자 이상이어야 합니다'));
      return;
    }

    if (value.length > 25) {
      setIsNicknameValid(false);
      setNicknameError(t('닉네임은 최대 25자까지 가능합니다'));
      return;
    }

    // Debounce nickname validation
    debounceTimer.current = setTimeout(() => {
      checkNickname(value);
    }, 500);
  };

  const checkNickname = async (nicknameToCheck: string) => {
    setIsCheckingNickname(true);
    setNicknameError('');

    try {
      const result = await profileService.checkNicknameAvailable(nicknameToCheck);

      if (result.available) {
        setIsNicknameValid(true);
        setNicknameError('');
      } else {
        setIsNicknameValid(false);
        setNicknameError(result.message);
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      setIsNicknameValid(false);
      setNicknameError(t('닉네임 확인 중 오류가 발생했습니다'));
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file); // Store actual file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNicknameValid) {
      return;
    }

    if (selectedCountry === 'OTHER') {
      alert(t('국적을 선택해주세요'));
      return;
    }

    setIsLoading(true);

    try {
      // Update profile data
      await profileService.updateProfile({
        username: nickname,
        country: selectedCountry,
        bio: bio || '',
      } as any);

      // Upload profile image if selected
      if (profileImageFile) {
        await profileService.updateProfileImage(profileImageFile);
      }

      alert(t('프로필이 설정되었습니다'));
      router.push(`/${locale}/main`);
    } catch (error) {
      console.error('Profile update error:', error);
      alert(t('네트워크 오류'));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = COUNTRIES.filter((country) => {
    const searchLower = countrySearch.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.enName.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower)
    );
  });

  const selectedCountryData = COUNTRIES.find((c) => c.code === selectedCountry);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E5E5]">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-lg sm:text-xl font-semibold text-center">{t('프로필 설정')}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-black">{t('프로필을 설정해주세요')}</h2>
            <p className="text-sm sm:text-base text-[#737373]">{t('다른 사용자들에게 보여질 정보입니다')}</p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="profile-image" className="cursor-pointer">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-center overflow-hidden hover:border-black transition-colors">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
            </label>
            <input id="profile-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <button type="button" onClick={() => document.getElementById('profile-image')?.click()} className="text-sm sm:text-base text-black hover:underline font-medium">
              {t('프로필 사진 선택')}
            </button>
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <Input
              type="text"
              label={t('닉네임')}
              placeholder={t('다른 사용자들에게 보여질 이름')}
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              error={nicknameError}
              maxLength={25}
              fullWidth
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            {isCheckingNickname && <div className="text-xs text-[#737373]">확인 중...</div>}
            {isNicknameValid && <div className="text-xs text-green-600">✓ 사용 가능한 닉네임입니다</div>}
            <p className="text-xs sm:text-sm text-[#737373] px-1">{nickname.length}/25</p>
          </div>

          {/* Country Selector */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-medium text-black mb-1">{t('국적')} *</label>
            <button
              type="button"
              onClick={() => setShowCountryDialog(true)}
              className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg text-left flex items-center justify-between hover:border-black transition-colors"
            >
              <span className={selectedCountry === 'OTHER' ? 'text-[#737373]' : 'text-black'}>
                {selectedCountryData ? `${selectedCountryData.flag} ${getCountryName(selectedCountry, locale)}` : t('국적 선택')}
              </span>
              <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-medium text-black mb-1">{t('자기소개')}</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t('간단한 자기소개를 작성해주세요')}
              maxLength={100}
              rows={3}
              className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            <p className="text-xs sm:text-sm text-[#737373] px-1">{bio.length}/100</p>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading} disabled={!isNicknameValid || selectedCountry === 'OTHER'}>
            {!isNicknameValid ? t('닉네임 확인 필요') : t('완료')}
          </Button>
        </form>
      </main>

      {/* Country Selection Dialog */}
      {showCountryDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] flex flex-col">
            {/* Dialog Header */}
            <div className="p-4 sm:p-6 border-b border-[#E5E5E5]">
              <h3 className="text-lg sm:text-xl font-bold text-black">{t('국적 선택')}</h3>
            </div>

            {/* Search */}
            <div className="p-4 sm:p-6 border-b border-[#E5E5E5]">
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                placeholder={t('국가 검색')}
                className="w-full px-4 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Country List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-8 text-[#737373]">{t('검색 결과가 없습니다')}</div>
              ) : (
                <div className="space-y-1">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setShowCountryDialog(false);
                        setCountrySearch('');
                      }}
                      className={`w-full px-4 py-3 text-left rounded-lg hover:bg-[#FAFAFA] transition-colors flex items-center justify-between ${
                        selectedCountry === country.code ? 'bg-[#FAFAFA] font-semibold' : ''
                      }`}
                    >
                      <span className="text-black">
                        {country.flag} {getCountryName(country.code, locale)}
                      </span>
                      {selectedCountry === country.code && (
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="p-4 sm:p-6 border-t border-[#E5E5E5]">
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setShowCountryDialog(false);
                  setCountrySearch('');
                }}
              >
                {t('취소')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
