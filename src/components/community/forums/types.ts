
export interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  tags: string[];
  replies?: ForumReply[];
  likes?: number;
  liked?: boolean;
}

export interface ForumReply {
  id: number;
  postId: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface Forum {
  id: number;
  title: string;
  members: number;
  posts: number;
  latestPost: string;
  timestamp: string;
  tags: string[];
  joined: boolean;
}

export interface NewForumPost {
  title: string;
  content: string;
  tags: string[];
}
