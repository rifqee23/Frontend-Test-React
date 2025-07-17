import { useNavigate, useSearchParams } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const goToPage = (page: number) => {
    searchParams.set('page', String(page));
    navigate({ search: searchParams.toString() });
  };

  const getDisplayedPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      );
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <nav className="flex items-center gap-2 mt-8 justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="text-gray-500 disabled:text-gray-300 hover:text-indigo-600 transition"
      >
        <span className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-indigo-100">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 1L1.91421 4.58578C1.24755 5.25245 0.914213 5.58579 0.914213 6C0.914213 6.41421 1.24755 6.74755 1.91421 7.41421L5.5 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {displayedPages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition ${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-indigo-100'
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="w-9 h-9 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="text-gray-500 disabled:text-gray-300 hover:text-indigo-600 transition"
      >
        <span className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-indigo-100">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 11L5.08578 7.41421C5.75245 6.74755 6.08579 6.41421 6.08579 6C6.08579 5.58579 5.75245 5.25245 5.08579 4.58579L1.5 1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
}
