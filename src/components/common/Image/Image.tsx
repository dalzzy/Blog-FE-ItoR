import { flexCenter } from '@/styles/common.styled';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
  placeholder?: React.ReactNode;
  thumbnail?: boolean;
}

const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
  thumbnail?: boolean;
  isLoaded?: boolean;
}>`
  position: relative;
  width: ${({ width }) => width || '100%'};
  aspect-ratio: ${({ thumbnail }) => (thumbnail ? '1 / 1' : 'auto')};
  height: ${({ height, thumbnail }) => (thumbnail ? 'auto' : height || 'auto')};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  background-color: ${({ isLoaded, theme }) => (isLoaded ? 'transparent' : theme.COLORS.gray[56])};
  aspect-ratio: ${({ thumbnail }) => (thumbnail ? '1 / 1' : 'auto')};
`;

const StyledImage = styled.img<{
  isLoaded: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: block;
`;

const Placeholder = styled.div`
  ${flexCenter}
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.COLORS.gray[90]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

const Image: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  borderRadius,
  placeholder = 'Loading...',
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ImageWrapper
      ref={wrapperRef}
      width={width}
      height={height}
      borderRadius={borderRadius}
      isLoaded={isLoaded}
    >
      {!isLoaded && <Placeholder>{placeholder}</Placeholder>}
      {shouldLoad && (
        <StyledImage
          src={src}
          alt={alt}
          objectFit={objectFit}
          borderRadius={borderRadius}
          isLoaded={isLoaded}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </ImageWrapper>
  );
};

export default Image;
