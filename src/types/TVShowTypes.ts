export interface TVShowData {
    title: string;
    seasons: number;
    description?: string;
    rating?: number;
  }
  
  export interface TVShow extends TVShowData {
    id: string;
    createdAt: Date;
  }
  