import { PrevSvg, NextSvg } from '@/assets';
import { flexCenter } from '@/styles/common.styled';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 40px 0;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  ${flexCenter}
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1.5px solid ${({ theme }) => theme.COLORS.neutral[5]};
  color: ${({ disabled, theme }) => (disabled ? theme.COLORS.neutral[5] : theme.COLORS.black)};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1.5px solid
    ${({ $active, theme }) => ($active ? theme.COLORS.primary[6] : theme.COLORS.neutral[5])};
  color: ${({ $active, theme }) => ($active ? theme.COLORS.primary[6] : theme.COLORS.black)};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.COLORS.primary[6]};
    color: ${({ theme }) => theme.COLORS.primary[6]};
  }
`;

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  size?: number;
  pagesPerGroup?: number; // 한번에 보여줄 페이지 버튼 수
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  size = 10,
  pagesPerGroup = 5,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / size);
  const currentGroup = Math.floor(currentPage / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages - 1);
  const isLastGroup = endPage >= totalPages - 1;

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePrevGroup = () => {
    if (startPage > 0) onPageChange(startPage - 1);
  };

  const handleNextGroup = () => {
    if (endPage < totalPages - 1) onPageChange(endPage + 1);
  };

  return (
    <Wrapper>
      <ArrowButton disabled={startPage === 0} onClick={handlePrevGroup}>
        <PrevSvg />
      </ArrowButton>
      {pageNumbers.map((page) => (
        <PageButton key={page} onClick={() => onPageChange(page)} $active={currentPage === page}>
          {page + 1}
        </PageButton>
      ))}
      <ArrowButton disabled={isLastGroup} onClick={handleNextGroup}>
        <NextSvg />
      </ArrowButton>
    </Wrapper>
  );
};

export default Pagination;
