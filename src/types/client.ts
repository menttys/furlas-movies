export type Movie = {
  id: string;
  title: string;
  poster_path: string;
};

export type MovieResponse = {
  results: Movie[];
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

export type BelongsTo_Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};
export type MovieDetails = {
  adult: boolean;
  backgrop_path: string;
  belongs_to_collection: BelongsTo_Collection;
  homepage: string;
  original_language: string;
  original_title: string;
  budget: number;
  id: number;
  title: string;
  tagline: string;
  popularity: number;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  poster_path: string;
  production_companies: ProductionCompany[];
  status: string;
};
