import { getFileUrl, getPresignedUrl } from '@/api/file/file.api';
import { useCallback, useState } from 'react';

export const useImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 blob URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setImageFile(file);

    // presignedURl 요청
    const presignedUrl = await getFileUrl(file.name);
    await getPresignedUrl(file, presignedUrl);

    const imageUrl = presignedUrl.split('?')[0];
    setUploadedUrl(imageUrl);

    return imageUrl;
  }, []);

  const reset = () => {
    setPreviewUrl(null);
    setImageFile(null);
    setUploadedUrl(null);
  };

  return {
    previewUrl,
    imageFile,
    uploadedUrl,
    handleImageChange,
    reset,
  };
};
