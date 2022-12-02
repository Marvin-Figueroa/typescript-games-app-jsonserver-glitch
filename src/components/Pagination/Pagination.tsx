import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.scss';
import { usePagination, DOTS } from '../../hooks/usePagination';

const Pagination = ({
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  function nextPage() {
    onPageChange(currentPage + 1);
  }

  function prevPage() {
    onPageChange(currentPage - 1);
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            disabled={currentPage === 1}
            className="page-btn"
            onClick={prevPage}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
        </li>
        {paginationRange.map((pageNum, index) => {
          if (pageNum === DOTS) {
            return (
              <li key={pageNum + index} className="page-item">
                <button className="page-btn dots">&#8230;</button>
              </li>
            );
          }

          return (
            <li key={pageNum} className="page-item">
              <button
                className={
                  pageNum === currentPage ? 'page-btn current-page' : 'page-btn'
                }
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            disabled={currentPage === lastPage}
            onClick={nextPage}
            className="page-btn"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Pagination);
