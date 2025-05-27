import { Header } from '@/components';
import TitleSection from '@/components/blogDetail/TitleSection';
import { useParams } from 'react-router-dom';
import ContentSection from '@/components/blogDetail/ContentSection';
import CommentSection from '@/components/blogDetail/CommentSection';
import { ContentWrapper } from '@/pages/post';
import styled from 'styled-components';
import BlogFooter from '@/components/blogDetail/BlogFooter';
import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { getPostItemApi } from '@/api/post/post.api';

const DetailWrapper = styled(ContentWrapper)`
  margin-top: 120px;
`;

const BlogDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const response = await getPostItemApi(postId);
        setPost(response.data);
        console.log('게시물 상세 조회 성공', response.data);
      } catch (err) {
        console.error('게시물 상세 조회 실패 ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div>로딩 중 ...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Header {...(post.isOwner ? { variant: 'detail' } : {})} />
      <DetailWrapper>
        <TitleSection
          title={post.title}
          nickName={post.nickName}
          profileImage={post.profileUrl || ''}
          createAt={post.createdAt}
          commentCount={post.comments.length || 0}
        />
        <ContentSection contents={post.contents ?? []} />
        <CommentSection
          postId={postId || ''}
          commentCount={post.comments.length}
          comments={post.comments}
        />
        <BlogFooter />
      </DetailWrapper>
    </div>
  );
};

export default BlogDetail;
