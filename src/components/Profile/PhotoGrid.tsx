'use client';

import { useTranslations } from 'next-intl';
import type { UserPhoto } from '@/types';

interface PhotoGridProps {
  photos: UserPhoto[];
  onPhotoClick: (index: number) => void;
  onAddPhoto: () => void;
}

export default function PhotoGrid({ photos, onPhotoClick, onAddPhoto }: PhotoGridProps) {
  const t = useTranslations();

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="w-15 h-15 text-[#A3A3A3] mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
        <h3 className="text-base font-semibold text-[#A3A3A3] mb-2">
          {t('나의 이야기 없음')}
        </h3>
        <p className="text-sm text-[#A3A3A3] mb-3">
          {t('첫 번째 이야기를 공유해보세요')}
        </p>
        <button
          onClick={onAddPhoto}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold hover:bg-[#262626] transition-colors"
        >
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t('이야기 추가')}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[2px]">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          className="aspect-square bg-[#F5F5F5] relative overflow-hidden hover:opacity-90 transition-opacity"
        >
          {photo.image ? (
            <img
              src={photo.image}
              alt={photo.caption || ''}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2">
              <p className="text-xs text-center line-clamp-5">
                {photo.caption || ''}
              </p>
            </div>
          )}
        </button>
      ))}

      {/* 추가 버튼 */}
      <button
        onClick={onAddPhoto}
        className="aspect-square bg-[#F5F5F5] border-2 border-[#D4D4D4] border-dashed flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
      >
        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
