import styled from 'styled-components';
import PostItem from '@/components/home/PostItem';
import { Pagination } from '@/components/index';
import { Post } from '@/types/post';

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 65px 16px;
`;

const Line = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.gray[96]};
`;

interface PostListProps {
  posts: Post[];
  currentPage: number;
  onPageChange: (page: number) => void;
  pageMax: number;
}

const PostList: React.FC<PostListProps> = ({ posts = [], currentPage, onPageChange, pageMax }) => {
  const size = 10;

  return (
    <Wrapper>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.postId}>
            <PostItem post={post} />
            <Line />
          </div>
        ))}

      <Pagination
        currentPage={currentPage}
        totalItems={pageMax * size}
        onPageChange={onPageChange}
        size={size}
        pagesPerGroup={5}
      />
    </Wrapper>
  );
};

export default PostList;
