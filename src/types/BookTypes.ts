export interface BookData {
    title: string;
    author: string;
    description?: string;
    rating?: number;
  }
  
  export interface Book extends BookData {
    id: string;
    createdAt: Date;
  }
