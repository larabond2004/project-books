import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      <button
        className="flex items-center gap-1 rounded-full border border-gray-300 px-4 py-2 text-blue-600 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="flex items-center gap-1 rounded-full border border-gray-300 px-4 py-2 text-blue-600 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
