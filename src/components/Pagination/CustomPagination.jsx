import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 bg-gray-200 rounded"
      >
        <FaChevronLeft size={20} />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 bg-gray-200 rounded"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default CustomPagination;
