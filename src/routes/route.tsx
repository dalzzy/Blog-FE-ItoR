import { createBrowserRouter } from 'react-router-dom';
import { HomePage, MyPage, Post, Signup, BlogDetail, MyPageSetting } from '@/pages';
import { KakaoLogin, Layout } from '@/components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/my', element: <MyPage /> },
      { path: '/my/setting', element: <MyPageSetting /> },
      { path: '/signup', element: <Signup /> },
      { path: '/signup/:type', element: <Signup /> },
      { path: '/post/write', element: <Post /> },
      { path: '/post/:postId', element: <BlogDetail /> },
      { path: '/oauth/kakao/success', element: <KakaoLogin /> },
    ],
  },
]);

export default router;
