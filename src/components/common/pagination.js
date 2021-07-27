import React from 'react';
import ReactPagination from 'react-js-pagination';
import { useTranslation } from 'react-i18next';

const Pagination = ({
  page,
  totalPages,
  totalItemCount,
  onPageChange,
  pageText,
  color,
  pageTextHidden,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`pagination-row ${color}`}>
      {!pageTextHidden && (
        <p className="counter">
          {t('pagination.pagePlaceholder')} <span>{page}</span>{' '}
          {t('pagination.ofPlaceholder')} <span>{totalPages}</span> {pageText}
        </p>
      )}
      <ReactPagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalItemCount}
        pageRangeDisplayed={3}
        onChange={onPageChange}
        prevPageText="<"
        lastPageText=">>"
        nextPageText=">"
        firstPageText="<<"
      />
    </div>
  );
};

export default Pagination;
