// Data Types
export type SubjectType = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

// Response Types
export type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  subjects: T[];
};
