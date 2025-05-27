export interface Post {
  postId: string;
  title: string;
  contents: PostContent[];
  nickName: string;
  createdAt: string;
  image?: string;
  commentCount: number;
  comments: Comment[];
  profileUrl?: string;
  isOwner?: boolean;
}

export interface Comment {
  id: number;
  nickname: string;
  profileImage: string;
  createdAt: string;
  content: string;
}

export interface ContentBlock {
  id: number;
  type: 'text' | 'image';
  value: string;
  url?: string;
  isActive?: boolean;
  placeholderHidden?: boolean;
}

export interface PostContent {
  contentOrder: number;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
}
