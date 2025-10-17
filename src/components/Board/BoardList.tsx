'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { postsService } from '@/lib/posts';
import { Post } from '@/types';
import Avatar from '@/components/ui/Avatar';

interface BoardListProps {
  onPostClick?: (post: Post) => void;
}

export default function BoardList({ onPostClick }: BoardListProps) {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { value: '', label: t('전체') },
    { value: 'free', label: t('자유게시판') },
    { value: 'question', label: t('질문게시판') },
    { value: 'market', label: t('중고거래') },
    { value: 'job', label: t('구인구직') },
  ];

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postsService.getPosts(
        selectedCategory ? { category: selectedCategory } : undefined
      );
      setPosts(data);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('로딩 중')}</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('게시글이 없습니다')}</div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  if (onPostClick) {
                    onPostClick(post);
                  } else {
                    router.push(`/${locale}/board/${post.id}`);
                  }
                }}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    src={post.author.profile_image}
                    name={post.author.username}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 truncate">
                        {post.author.username}
                      </span>
                      {post.category && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {t(
                            post.category === 'free'
                              ? '자유게시판'
                              : post.category === 'question'
                              ? '질문게시판'
                              : post.category === 'market'
                              ? '중고거래'
                              : '구인구직'
                          )}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  {post.title && (
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
                  )}
                  <p className="text-gray-700 text-sm line-clamp-3">{post.content}</p>
                </div>

                {/* Images Preview */}
                {(post as any).post_images && (post as any).post_images.length > 0 && (
                  <div className="mb-3">
                    <div className="grid grid-cols-3 gap-2">
                      {(post as any).post_images.slice(0, 3).map((img: any, idx: number) => (
                        <div
                          key={img.id || idx}
                          className="aspect-square rounded-lg bg-gray-200 overflow-hidden"
                        >
                          <img
                            src={img.image}
                            alt={`이미지 ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post.comments_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
        onClick={() => {
          // TODO: 게시글 작성 모달 열기
          alert(t('게시글 작성 기능은 곧 구현됩니다'));
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
