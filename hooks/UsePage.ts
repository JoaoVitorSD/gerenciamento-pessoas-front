import { useState } from "react";

export default function usePage<T>(): PageProps<T>{

  const page = useState<Page<T>>({
    content: [],
    page: 0,
    size: 10,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
  });

  function moveRight() {
    if(page[0].page < page[0].totalPages - 1){
        page[1]({
            ...page[0],
            page: page[0].page + 1,
        });
    }
  }
  function moveLeft() {
    if (page[0].page > 0) {
      page[1]({
        ...page[0],
        page: page[0].page - 1,
      });
    }
  }
  function getPageParams(): Record<string, any> {
    return {
      page: page[0].page,
      size: page[0].size,
    };
  }
  function clean() {
    page[1]({
      ...page[0],
      page: 0,
      content: [],
    });
  }
  return {
    ...page[0],
    setPage: page[1],
    moveLeft,
    moveRight,
    getPageParams,
    clean,
  };
}

interface Page<T> {
  content: T[];
  page: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface PageProps<T> {
  content: T[];
  page: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  moveLeft: () => void;
  moveRight: () => void;
  getPageParams: () => Record<string, string>;
  setPage: (page: Page<T>) => void;
  clean: () => void;
}