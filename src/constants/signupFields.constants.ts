export const emailSignupFields = [
  { label: '이메일', placeholder: '이메일', name: 'email', type: 'text' },
  { label: '비밀번호', placeholder: '비밀번호', name: 'password', type: 'password' },
  {
    label: '비밀번호 확인',
    placeholder: '비밀번호 확인',
    name: 'confirmPassword',
    type: 'password',
  },
  { label: '이름', placeholder: '이름', name: 'name', type: 'text' },
  { label: '생년월일', placeholder: 'YYYY - MM - DD', name: 'birthDate', type: 'text' },
  { label: '닉네임', placeholder: '닉네임', name: 'nickname', type: 'text' },
  { label: '한 줄 소개', placeholder: '한 줄 소개', name: 'introduction', type: 'text' },
] as const;

export const kakaoSignupFields = [
  { label: '소셜 로그인', placeholder: '카카오 로그인', name: 'socialLogin', type: 'text' },
  { label: '이메일', placeholder: '이메일', name: 'email', type: 'text' },
  { label: '이름', placeholder: '이름', name: 'name', type: 'text' },
  { label: '생년월일', placeholder: 'YYYY - MM - DD', name: 'birthDate', type: 'text' },
  { label: '닉네임', placeholder: '닉네임', name: 'nickname', type: 'text' },
  { label: '한 줄 소개', placeholder: '한 줄 소개', name: 'introduction', type: 'text' },
] as const;
