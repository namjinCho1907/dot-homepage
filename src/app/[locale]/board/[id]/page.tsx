'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { postsService } from '@/lib/posts';
import { getCountryData } from '@/lib/countries';
import type { Post, Comment } from '@/types';
import Avatar from '@/components/ui/Avatar';

export default function BoardDetailPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const postId = parseInt(params.id as string);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadPostDetail();
  }, [postId]);

  const loadPostDetail = async () => {
    try {
      setLoading(true);
      const [postData, commentsData] = await Promise.all([
        postsService.getPost(postId),
        postsService.getComments(postId),
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      alert(t('게시글을 불러오는데 실패했습니다'));
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;

    try {
      const result = await postsService.toggleLike(postId);
      setPost({
        ...post,
        is_liked: result.liked,
        likes_count: result.likes_count,
      });
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const newComment = await postsService.createComment(postId, commentText);
      setComments([...comments, newComment]);
      setCommentText('');
      if (post) {
        setPost({
          ...post,
          comments_count: post.comments_count + 1,
        });
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert(t('댓글 작성에 실패했습니다'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm(t('댓글을 삭제하시겠습니까?'))) return;

    try {
      await postsService.deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
      if (post) {
        setPost({
          ...post,
          comments_count: post.comments_count - 1,
        });
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert(t('댓글 삭제에 실패했습니다'));
    }
  };

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return '';
    const country = getCountryData().find((c) => c.code === countryCode);
    return country?.flag || '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return t('방금 전');
    if (diffInMinutes < 60) return `${diffInMinutes}${t('분 전')}`;
    if (diffInHours < 24) return `${diffInHours}${t('시간 전')}`;
    if (diffInDays < 7) return `${diffInDays}${t('일 전')}`;

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 mb-4">{t('게시글을 찾을 수 없습니다')}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          {t('돌아가기')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-2 text-lg font-semibold">{t('게시판')}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Post Content */}
        <div className="border-b border-gray-200 p-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar
              src={post.author.profile_image}
              name={post.author.username}
              size="lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">{post.author.username}</span>
                {post.author.country && (
                  <span className="text-sm">{getCountryFlag(post.author.country)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{formatDate(post.created_at)}</span>
                {post.city && (
                  <span>
                    • {post.city === '해외로 설정됨' ? t('해외로 설정됨') : post.city}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          {post.title && (
            <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
          )}

          {/* Content */}
          <p className="text-gray-800 whitespace-pre-wrap mb-4">{post.content}</p>

          {/* Images */}
          {(post as any).post_images && (post as any).post_images.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-1 gap-2">
                {(post as any).post_images.map((img: any) => (
                  <div key={img.id} className="w-full rounded-lg overflow-hidden">
                    <img
                      src={img.image}
                      alt={t('게시글 이미지')}
                      className="w-full h-auto object-contain max-h-96"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats & Actions */}
          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <svg
                className={`w-6 h-6 ${post.is_liked ? 'fill-red-500 text-red-500' : 'fill-none'}`}
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
              <span className="font-medium">{post.likes_count}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">{post.comments_count}</span>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            {t('댓글')} {comments.length}
          </h3>

          {comments.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              {t('첫 번째 댓글을 작성해보세요')}
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar
                    src={comment.author.profile_image}
                    name={comment.author.username}
                    size="md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.author.username}</span>
                      {comment.author.country && (
                        <span className="text-xs">{getCountryFlag(comment.author.country)}</span>
                      )}
                      <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-800 text-sm whitespace-pre-wrap">{comment.content}</p>
                  </div>
                  {/* TODO: 본인 댓글만 삭제 버튼 표시 */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comment Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t('댓글을 입력하세요')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
            className="px-6 py-2 bg-black text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            {t('전송')}
          </button>
        </form>
      </div>
    </div>
  );
}
