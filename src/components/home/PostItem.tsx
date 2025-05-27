import theme from '@/styles/theme.styled';
import styled from 'styled-components';
import { flexAlignCenter, flexColumn, flexJustifyCenter } from '@/styles/common.styled';
import { Image } from '@/components';
import { Post } from '@/types/post';
import { formatPostDate } from '@/utils/formatPostDate';
import { useNavigate } from 'react-router-dom';
import DefaultProfileSvg from '@/assets/icon/ic_default_profile.svg?url';

export interface PostItemProps {
  post: Post;
}

type TextColor = 'black' | 'gray33' | 'gray56' | 'gray20' | 'gray78';

export const Text = styled.div<{
  fontSize?: keyof typeof theme.FONT_SIZE;
  fontWeight?: keyof typeof theme.FONT_WEIGHT;
  color?: TextColor;
}>`
  font-weight: ${({ theme, fontWeight = 'regular' }) => theme.FONT_WEIGHT[fontWeight]};
  font-size: ${({ theme, fontSize = 'sm' }) => theme.FONT_SIZE[fontSize]};
  color: ${({ theme, color = 'black' }) => {
    switch (color) {
      case 'gray33':
        return theme.COLORS.gray[33];
      case 'gray56':
        return theme.COLORS.gray[56];
      case 'gray20':
        return theme.COLORS.gray[20];
      case 'gray78':
        return theme.COLORS.gray[78];
      case 'black':
      default:
        return theme.COLORS.black;
    }
  }};
  line-height: 1.6;
  letter-spacing: 0.3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FlexItem = styled.div<{ hasImage?: boolean }>`
  ${flexJustifyCenter};
  gap: ${({ hasImage }) => (hasImage ? '36px' : '0')};
`;

export const ItemContainer = styled.div`
  ${flexColumn}
  gap:36px;
  padding: 24px 0;
  cursor: pointer;
`;

export const TextContent = styled.div`
  ${flexColumn}
  gap: 10px;
  flex: 1;
`;

export const FooterItem = styled.div`
  ${flexAlignCenter}
  gap:14px;
`;

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/post/${post.postId}`);
  };

  const imageContent = post.contents?.find((c) => c.contentType === 'IMAGE');

  return (
    <ItemContainer onClick={handleClick}>
      <FlexItem hasImage={!!imageContent}>
        <TextContent>
          <Text fontWeight="medium" fontSize="md">
            {post.title}
          </Text>
          <Text color="gray33">
            {post.contents
              ?.filter((c) => c.contentType === 'TEXT')
              .map((c) => c.content)
              .join(' ')
              .slice(0, 100) || '내용 없음'}
          </Text>
        </TextContent>
        {imageContent && (
          <Image
            src={imageContent.content}
            width="120px"
            height="120px"
            alt="post-image"
            borderRadius="2px"
            objectFit="cover"
            thumbnail
          />
        )}
      </FlexItem>
      <FooterItem>
        <Image
          src={
            post.profileUrl && post.profileUrl.trim() !== '' ? post.profileUrl : DefaultProfileSvg
          }
          alt="profile-img"
          width="20px"
          height="20px"
          borderRadius="50%"
          objectFit="cover"
        />

        <Text color="gray20">{post.nickName}</Text>
        <Text color="gray56">{formatPostDate(post.createdAt)}</Text>
        <Text color="gray56">댓글{post.comments.length}</Text>
      </FooterItem>
    </ItemContainer>
  );
};

export default PostItem;
