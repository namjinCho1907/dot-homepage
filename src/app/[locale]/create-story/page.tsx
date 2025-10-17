'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { profileService } from '@/lib/profile';

export default function CreateStoryPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage && !caption.trim()) {
      alert('이미지 또는 글을 작성해주세요');
      return;
    }

    try {
      setIsUploading(true);
      await profileService.uploadUserPhoto(
        selectedImage || undefined,
        caption.trim() || undefined
      );
      alert('이야기가 성공적으로 추가되었습니다');
      // 프로필 탭(4)으로 이동
      router.push(`/${locale}/main?tab=4`);
    } catch (error: any) {
      console.error('이야기 업로드 실패:', error);
      alert(error.response?.data?.error || '이야기 업로드에 실패했습니다');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">새 이야기</h1>
          <button
            onClick={handleSubmit}
            disabled={(!selectedImage && !caption.trim()) || isUploading}
            className="text-blue-600 font-semibold hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isUploading ? '업로드 중...' : '공유'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* 이미지 선택/미리보기 */}
          <div className="mb-5">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">클릭하여 사진 선택 (선택사항)</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (최대 10MB)</p>
                  <p className="text-xs text-gray-400 mt-2">또는 글만 작성하여 공유할 수 있습니다</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            )}
          </div>

          {/* 캡션 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              글 작성 {!selectedImage && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="이야기를 작성해주세요... (이미지가 없으면 필수)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {caption.length}/500
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
