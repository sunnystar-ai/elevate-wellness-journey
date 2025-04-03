
import ForumPostForm from './ForumPostForm';
import ForumHeader from './ForumHeader';
import ForumSearch from './ForumSearch';
import PostsList from './PostsList';
import { useForumPosts } from './useForumPosts';

interface ForumPostsListProps {
  page?: number;
  postsPerPage?: number;
}

const ForumPostsList = ({ page = 1, postsPerPage = 5 }: ForumPostsListProps) => {
  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    showPostForm,
    togglePostForm,
    clearSearch,
    handleNewPostSuccess,
    handleLike
  } = useForumPosts();
  
  // Calculate pagination
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="space-y-4">
      <ForumHeader 
        showPostForm={showPostForm}
        togglePostForm={togglePostForm}
      />
      
      {showPostForm && (
        <ForumPostForm 
          forumId={0}
          forumTitle="Community Forum"
          onCancel={() => togglePostForm()}
          onSuccess={handleNewPostSuccess}
        />
      )}
      
      <ForumSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <PostsList 
        posts={paginatedPosts} 
        onLike={handleLike}
        clearSearch={clearSearch}
      />
    </div>
  );
};

export default ForumPostsList;
