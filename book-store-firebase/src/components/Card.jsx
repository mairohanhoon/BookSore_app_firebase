import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 h-[450px] bg-white border shadow-md hover:shadow-lg transition-all duration-300 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <div className="flex justify-center items-center h-48">
        <a href="#">
          <img
            className="rounded-t-lg h-48 w-48 object-contain"
            src={book.data().coverPhotoURL ? book.data().coverPhotoURL : "https://img.icons8.com/?size=100&id=71733&format=png&color=000000"}
            alt=""
          />
        </a>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {book.data().name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 flex-grow">
          This has a title {book.data().name} and this book is sold by{" "}
          {book.data().displayName} and this book is priced at{" "}
          {book.data().price}
        </p>
        <button
          onClick={() => navigate(`/book/view/${book.id}`)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
