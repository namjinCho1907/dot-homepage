'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { profileService } from '@/lib/profile';
import type { User, UserPhoto, UserPhotoComment } from '@/types';

interface PhotoDetailModalProps {
  photos: UserPhoto[];
  initialIndex: number;
  currentUser: User;
  onClose: () => void;
  onPhotoDeleted: () => void;
}

export default function PhotoDetailModal({
  photos,
  initialIndex,
  currentUser,
  onClose,
  onPhotoDeleted,
}: PhotoDetailModalProps) {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [localPhotos, setLocalPhotos] = useState<UserPhoto[]>(photos);
  const [commentText, setCommentText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editCaptionText, setEditCaptionText] = useState('');

  const currentPhoto = localPhotos[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsMenuOpen(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < localPhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsMenuOpen(false);
    }
  };

  const handleLike = async () => {
    try {
      const newIsLiked = !currentPhoto.is_liked;
      const newLikesCount = newIsLiked
        ? currentPhoto.likes_count + 1
        : currentPhoto.likes_count - 1;

      // 낙관적 UI 업데이트
      const updatedPhotos = [...localPhotos];
      updatedPhotos[currentIndex] = {
        ...currentPhoto,
        is_liked: newIsLiked,
        likes_count: newLikesCount,
      };
      setLocalPhotos(updatedPhotos);

      // API 호출
      if (newIsLiked) {
        await profileService.likeUserPhoto(currentPhoto.id);
      } else {
        await profileService.unlikeUserPhoto(currentPhoto.id);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      // 에러 시 롤백
      const updatedPhotos = [...localPhotos];
      updatedPhotos[currentIndex] = currentPhoto;
      setLocalPhotos(updatedPhotos);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = await profileService.addUserPhotoComment(
        currentPhoto.id,
        commentText.trim()
      );

      // 댓글 목록 업데이트
      const updatedPhotos = [...localPhotos];
      updatedPhotos[currentIndex] = {
        ...currentPhoto,
        comments: [...currentPhoto.comments, newComment],
        comments_count: currentPhoto.comments_count + 1,
      };
      setLocalPhotos(updatedPhotos);
      setCommentText('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert(t('댓글 작성에 실패했습니다'));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm(t('댓글을 삭제하시겠습니까?'))) return;

    try {
      await profileService.deleteUserPhotoComment(commentId);

      // 댓글 목록 업데이트
      const updatedPhotos = [...localPhotos];
      updatedPhotos[currentIndex] = {
        ...currentPhoto,
        comments: currentPhoto.comments.filter(c => c.id !== commentId),
        comments_count: currentPhoto.comments_count - 1,
      };
      setLocalPhotos(updatedPhotos);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert(t('댓글 삭제에 실패했습니다'));
    }
  };

  const handleEditCaption = () => {
    setEditCaptionText(currentPhoto.caption || '');
    setIsEditingCaption(true);
    setIsMenuOpen(false);
  };

  const handleSaveCaption = async () => {
    try {
      await profileService.updatePhotoCaption(currentPhoto.id, editCaptionText);

      const updatedPhotos = [...localPhotos];
      updatedPhotos[currentIndex] = {
        ...currentPhoto,
        caption: editCaptionText,
      };
      setLocalPhotos(updatedPhotos);
      setIsEditingCaption(false);
      alert(t('캡션이 수정되었습니다'));
    } catch (error) {
      console.error('캡션 수정 실패:', error);
      alert(t('캡션 수정에 실패했습니다'));
    }
  };

  const handleDeletePhoto = async () => {
    if (!confirm(t('이 게시물을 삭제하시겠습니까?'))) return;

    try {
      await profileService.deleteUserPhoto(currentPhoto.id);
      setIsMenuOpen(false);
      onClose();
      onPhotoDeleted();
      alert(t('삭제되었습니다'));
    } catch (error) {
      console.error('사진 삭제 실패:', error);
      alert(t('삭제에 실패했습니다'));
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t('방금 전');
    if (diffInSeconds < 3600) return t(`${Math.floor(diffInSeconds / 60)}분 전`);
    if (diffInSeconds < 86400) return t(`${Math.floor(diffInSeconds / 3600)}시간 전`);
    if (diffInSeconds < 604800) return t(`${Math.floor(diffInSeconds / 86400)}일 전`);
    if (diffInSeconds < 2592000) return t(`${Math.floor(diffInSeconds / 604800)}주 전`);
    if (diffInSeconds < 31536000) return t(`${Math.floor(diffInSeconds / 2592000)}개월 전`);
    return t(`${Math.floor(diffInSeconds / 31536000)}년 전`);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-base font-semibold">
            {currentIndex + 1} / {localPhotos.length}
          </h1>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 이미지 */}
        {currentPhoto.image && (
          <div className="bg-white">
            <img
              src={currentPhoto.image}
              alt={currentPhoto.caption || ''}
              className="w-full object-contain"
            />
          </div>
        )}

        {/* 좋아요 버튼 */}
        <div className="bg-white px-2 py-2">
          <button
            onClick={handleLike}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className={`w-7 h-7 ${currentPhoto.is_liked ? 'text-red-500' : 'text-black'}`}
              fill={currentPhoto.is_liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* 좋아요 개수 */}
        <div className="bg-white px-4">
          <p className="text-sm font-bold">
            {t('좋아요')} {currentPhoto.likes_count}{t('개')}
          </p>
        </div>

        {/* 캡션 */}
        {currentPhoto.caption && (
          <div className="bg-white px-4 py-2">
            <p className="text-sm">
              <span className="font-bold">{currentUser.username}</span>{' '}
              {currentPhoto.caption}
            </p>
          </div>
        )}

        {/* 댓글 목록 */}
        <div className="bg-white px-4 py-2">
          {currentPhoto.comments.length > 0 && (
            <>
              <p className="text-sm font-semibold mb-2">
                {t('댓글')} {currentPhoto.comments_count}{t('개')}
              </p>
              {currentPhoto.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                    {comment.user.profile_image ? (
                      <img
                        src={comment.user.profile_image}
                        alt={comment.user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#A3A3A3]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-bold">{comment.user.username}</span>{' '}
                      {comment.content}
                    </p>
                  </div>
                  {comment.user.id === currentUser.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="flex-shrink-0 p-1 text-[#737373] hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </>
          )}

          {currentPhoto.comments.length === 0 && (
            <p className="text-sm text-[#737373] py-4">
              {t('첫 번째 댓글을 남겨보세요')}
            </p>
          )}
        </div>
      </div>

      {/* 댓글 입력 */}
      <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] px-4 py-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
            placeholder={t('댓글 달기')}
            className="flex-1 px-3 py-2 border border-[#D4D4D4] rounded-lg text-sm focus:outline-none focus:border-black"
          />
          <button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            className="px-4 py-2 text-blue-500 font-semibold text-sm disabled:text-[#D4D4D4]"
          >
            {t('게시')}
          </button>
        </div>
      </div>

      {/* 옵션 메뉴 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#D4D4D4] rounded-full mx-auto mb-4" />

            <button
              onClick={handleEditCaption}
              className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>{t('캡션 수정')}</span>
              </div>
            </button>

            <button
              onClick={handleDeletePhoto}
              className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-red-500">{t('삭제')}</span>
              </div>
            </button>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg transition-colors mt-2"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-[#737373]">{t('취소')}</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 캡션 수정 다이얼로그 */}
      {isEditingCaption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{t('캡션 수정')}</h2>
            <textarea
              value={editCaptionText}
              onChange={(e) => setEditCaptionText(e.target.value)}
              placeholder={t('캡션을 입력하세요')}
              className="w-full px-3 py-2 border border-[#D4D4D4] rounded-lg text-sm focus:outline-none focus:border-black resize-none"
              rows={3}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsEditingCaption(false)}
                className="flex-1 py-2 px-4 border border-[#D4D4D4] rounded-md text-sm font-semibold hover:bg-[#F5F5F5] transition-colors"
              >
                {t('취소')}
              </button>
              <button
                onClick={handleSaveCaption}
                className="flex-1 py-2 px-4 bg-black text-white rounded-md text-sm font-semibold hover:bg-[#262626] transition-colors"
              >
                {t('저장')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 이전/다음 네비게이션 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="fixed left-2 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentIndex < localPhotos.length - 1 && (
        <button
          onClick={handleNext}
          className="fixed right-2 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
