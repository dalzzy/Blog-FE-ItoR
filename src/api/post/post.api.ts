import { ContentBlock, PostContent } from '@/types/post';
import api from '@/api/api';

const PATH = '/posts';

// POST
export interface PostRequestBody {
  title: string;
  contents: PostContent[];
}

const postApi = async (title: string, blocks: ContentBlock[]) => {
  const postData: PostRequestBody = {
    title,
    contents: blocks.map((block, idx) => ({
      contentOrder: idx + 1,
      content: block.type === 'text' ? block.value : block.url || '',
      contentType: block.type.toUpperCase() as 'TEXT' | 'IMAGE',
    })),
  };

  console.log('postData: ', postData);
  const response = await api.post(`${PATH}`, postData);
  return response.data;
};

// DELETE

// PATCH

// GET
// 게시물 목록
interface GetPostsParams {
  size: number;
  page: number;
}

// 토큰 O
const getPostsWithTokenApi = async ({ size, page }: GetPostsParams) => {
  const response = await api.get(`${PATH}/all/token`, {
    params: { size, page },
  });
  return response.data.data;
};

// 토큰 X
const getPostsApi = async ({ size, page }: GetPostsParams) => {
  const response = await api.get(`${PATH}/all`, {
    params: { size, page },
  });

  return response.data.data;
};

// 상세 게시물
const getPostItemApi = async (postId: string) => {
  const response = await api.get(`${PATH}`, {
    params: { postId },
  });
  return response.data;
};

export { postApi, getPostsWithTokenApi, getPostsApi, getPostItemApi };
