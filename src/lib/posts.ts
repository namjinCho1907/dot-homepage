import { api } from './api';
import { Post, Comment } from '@/types';

export const postsService = {
  // 게시글 목록 조회
  async getPosts(params?: {
    my_posts?: boolean;
    category?: string;
    distance?: string;
    city?: string;
  }): Promise<Post[]> {
    const response = await api.get('/community/posts/', { params });
    // 페이지네이션 응답에서 results 배열 추출
    return response.data.results || response.data;
  },

  // 게시글 상세 조회
  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/community/posts/${id}/`);
    return response.data;
  },

  // 게시글 작성
  async createPost(data: {
    content: string;
    title?: string;
    category?: string;
    images?: string[];
  }): Promise<Post> {
    const response = await api.post('/community/posts/', data);
    return response.data;
  },

  // 게시글 수정
  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    const response = await api.put(`/community/posts/${id}/`, data);
    return response.data;
  },

  // 게시글 삭제
  async deletePost(id: number): Promise<void> {
    await api.delete(`/community/posts/${id}/`);
  },

  // 좋아요 토글
  async toggleLike(postId: number): Promise<{ liked: boolean; likes_count: number }> {
    const response = await api.post(`/community/posts/${postId}/like/`);
    return response.data;
  },

  // 댓글 목록 조회
  async getComments(postId: number): Promise<Comment[]> {
    const response = await api.get(`/community/posts/${postId}/comments/`);
    // 페이지네이션 응답에서 results 배열 추출
    return response.data.results || response.data;
  },

  // 댓글 작성
  async createComment(postId: number, content: string): Promise<Comment> {
    const response = await api.post(`/community/posts/${postId}/comments/`, { content });
    return response.data;
  },

  // 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    await api.delete(`/community/comments/${commentId}/`);
  },
};
