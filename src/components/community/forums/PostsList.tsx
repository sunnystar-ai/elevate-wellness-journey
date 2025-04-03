
import ForumPostCard from './ForumPostCard';
import { ForumPost } from './types';
import EmptyPostsState from './EmptyPostsState';

interface PostsListProps {
  posts: ForumPost[];
  onLike: (postId: number, liked: boolean) => void;
  clearSearch: () => void;
}

const PostsList = ({ posts, onLike, clearSearch }: PostsListProps) => {
  if (posts.length === 0) {
    return <EmptyPostsState clearSearch={clearSearch} />;
  }

  return (
    <>
      {posts.map(post => (
        <ForumPostCard 
          key={post.id} 
          post={post} 
          onLike={onLike}
        />
      ))}
    </>
  );
};

export default PostsList;
