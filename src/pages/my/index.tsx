import { getPostsWithTokenApi, getPostsApi } from '@/api/post/post.api';
import { Header } from '@/components';
import BlogFooter from '@/components/blogDetail/BlogFooter';
import PostList from '@/components/home/PostList';
import { useUser } from '@/context/UserContext';
import { Post } from '@/types/post';
import { useState, useEffect } from 'react';

const MyPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageMax, setPageMax] = useState(1);
  const size = 10;

  const { isLoggedIn, user } = useUser();

  const fetchPosts = async (page: number) => {
    try {
      const response =
        isLoggedIn && user
          ? await getPostsWithTokenApi({ page, size })
          : await getPostsApi({ page, size });

      setPosts(response.post);
      setPageMax(response.pageMax);
      console.log('게시물 조회 성공', response);
    } catch (err) {
      console.error('게시물 조회 실패', err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, isLoggedIn]);

  return (
    <div>
      <Header variant="write" />
      <BlogFooter />
      <PostList
        posts={posts}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageMax={pageMax}
      />
    </div>
  );
};

export default MyPage;
