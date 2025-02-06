export interface MovieData {
    title: string;
    description?: string;
    releaseDate: string;
    rating?: number;
  }
  
  export interface Movie extends MovieData {
    id: string;
    createdAt: Date;
  }
  