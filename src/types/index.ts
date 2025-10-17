export interface User {
  id: number;
  phone_number: string;
  username: string;
  email?: string;
  profile_image?: string;
  bio?: string;
  country?: string;
  nationality?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  address?: string;
  created_at: string;
  friends_count?: number;
  photos?: UserPhoto[];
}

export interface UserPhoto {
  id: number;
  image?: string;
  caption?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  comments: UserPhotoComment[];
}

export interface UserPhotoComment {
  id: number;
  user: User;
  content: string;
  created_at: string;
}

export interface Notification {
  id: number;
  sender?: User;
  notification_type: 'friend_request' | 'comment' | 'like' | 'message';
  message: string;
  is_read: boolean;
  created_at: string;
  related_object_id?: number;
}

export interface Post {
  id: number;
  author: User;
  title?: string;
  content: string;
  category: 'free' | 'question' | 'market' | 'job';
  images?: string[];
  latitude?: number;
  longitude?: number;
  city?: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

export interface Comment {
  id: number;
  author: User;
  post: number;
  content: string;
  created_at: string;
}

export interface Board {
  id: number;
  author: User;
  title: string;
  content: string;
  category: string;
  images?: string[];
  created_at: string;
  updated_at: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

export interface BoardComment {
  id: number;
  author: User;
  board: number;
  content: string;
  created_at: string;
}

export interface Gathering {
  id: number;
  author: User;
  title: string;
  content: string;
  max_participants: number;
  current_participants: number;
  status: 'active' | 'full' | 'closed';
  allowed_countries: string[];
  latitude?: number;
  longitude?: number;
  city?: string;
  post_images?: { id: number; image: string; order: number }[];
  created_at: string;
  updated_at: string;
  is_participant: boolean;
  is_joined: boolean;
  distance?: number;
  chat_room?: { id: number; name?: string };
}

export interface ChatParticipant {
  user: {
    id: number;
    username: string;
    profile_image?: string;
    country: string;
  };
  joined_at: string;
  last_read_at: string;
  is_active: boolean;
}

export interface ChatRoom {
  id: number;
  room_type: 'private' | 'participation';
  name?: string;
  participants: ChatParticipant[];
  last_message?: ChatMessage;
  unread_count: number;
  created_at: string;
  last_message_at: string;
}

export interface ChatMessage {
  id: number;
  sender: {
    id: number;
    username: string;
    profile_image?: string;
    country: string;
  };
  message_type: string;
  content: string;
  image?: string;
  translated_content?: string;
  read_count: number;
  created_at: string;
  edited_at?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  is_new_user?: boolean;
  message?: string;
}

export interface PhoneVerifyRequest {
  phone_number: string;
}

export interface PhoneVerifyResponse {
  message: string;
  is_existing_user?: boolean;
  token?: string;
  user?: User;
}

export interface CodeVerifyRequest {
  phone_number: string;
  verification_code: string;
}

export interface RegisterRequest {
  phone_number: string;
  username: string;
  email?: string;
  nationality?: string;
}
