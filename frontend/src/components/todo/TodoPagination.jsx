import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Sinh danh sách trang dạng "cửa sổ trượt": 1 ... 4 5 [6] 7 8 ... 20
// siblingCount: số trang hiện xung quanh trang hiện tại mỗi bên
function getPageNumbers(currentPage, totalPages, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5; // 2 đầu-cuối + 2 dấu ... + trang hiện tại + 2 sibling*... đơn giản hóa dưới

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const pages = [1];

  if (showLeftDots) pages.push('dots-left');

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightDots) pages.push('dots-right');

  if (totalPages !== 1) pages.push(totalPages);

  return pages;
}

export default function TodoPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages, 1);

  return (
    <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm sm:px-6">
      {/* Giao diện Mobile tối giản */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Trước
        </button>
        <span className="flex items-center text-sm text-slate-500">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Sau
        </button>
      </div>

      {/* Giao diện Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Hiển thị trang <span className="font-semibold text-slate-900">{currentPage}</span> trên tổng số <span className="font-semibold text-slate-900">{totalPages}</span> trang
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm gap-1" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 focus:z-20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {pageNumbers.map((pageNum, idx) => {
              if (typeof pageNum !== 'number') {
                return (
                  <span
                    key={`${pageNum}-${idx}`}
                    className="relative inline-flex items-center rounded-lg px-2 py-2 text-slate-400 select-none"
                  >
                    <MoreHorizontal size={18} />
                  </span>
                );
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    currentPage === pageNum
                      ? 'z-10 bg-blue-600 text-white'
                      : 'text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 focus:z-20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}