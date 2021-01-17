import React from 'react';
import ReactPagination from 'react-js-pagination';
import { constants } from '../constants';

const Pagination = ({
  page,
  totalPages,
  totalItemCount,
  onPageChange,
  pageText,
  color,
  pageTextHidden,
}) => {
  const { ofPlaceholder, pagePlaceholder } = constants.pagination;
  return (
    <div className={`pagination-row ${color}`}>
      {!pageTextHidden && (
        <p className="counter">
          {pagePlaceholder} <span>{page}</span> {ofPlaceholder}{' '}
          <span>{totalPages}</span> {pageText}
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
