import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { MetaData } from "../model/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => any;
  itemsLength: number;
}

export default function AppPagination({ metaData, onPageChange, itemsLength }: Props) {
  const { currentPage, totalPages, pageSize, totalCount } = metaData;

  const [pageNumber, setPageNumber] = useState(currentPage);

  const firstItem = ((pageNumber-1)* pageSize) + 1;

 // const lastItem = firstItem + (itemsLength-1);


  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(page: number) {
    if (page > totalPages) {
      page = 1;
    }
    setPageNumber(page);
    onPageChange(page);
  }
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
     {/**
      *  <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#!"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#!"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      * 
      */}
      <div className="sm:flex-1 md:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstItem}</span>{" to "}
            {pageNumber * pageSize > totalCount
              ? totalCount
              : pageNumber * pageSize}{" "}
            <span className="font-medium"></span> of{" "}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
            href="#!"
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                pageNumber > 1
                  ? "cursor-pointer opacity-100"
                  : "cursor-auto opacity-25"
              }`}
              onClick={(e) => {
                if (pageNumber > 1) {
                  handlePageChange(pageNumber - 1);
                }else{
                  e.preventDefault();
                }
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {pageNumbers.map((number) => {
                return(
                    <a
                    key={number}
              href="#!"
              aria-current={pageNumber === number ? 'page' : 'false'}
              className={`z-10  relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pageNumber === number ? 'bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-indigo-100' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '}`}

              onClick={() => {
                handlePageChange(number)
              }}
            >
              {number}
            </a>
                );
            })}
           
         {/**
          * 
          * <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              10
            </a>
          */}   
            <a
            href="#!"
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                pageNumber < totalPages
                  ? "cursor-pointer opacity-100"
                  : "cursor-auto opacity-25"
              }`}
              onClick={(e) => {
                if(pageNumber < totalPages){
                  handlePageChange(pageNumber + 1);
                }else{
                  e.preventDefault();
                }
                
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
