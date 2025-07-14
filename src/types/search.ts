export interface Detail extends Preview {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Type: string;
  Writer: string;
};

export interface Preview {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string
};

export interface Search {
  page?: number;
  searchTerm: string;
};