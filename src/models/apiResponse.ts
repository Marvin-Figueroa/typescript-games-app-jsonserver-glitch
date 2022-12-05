import { IGame } from './game';

export interface IAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: IGame[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  noindex: boolean;
  nofollow: boolean;
  description: string;
  filters: Filters;
  nofollow_collections: string[];
}

export interface Filters {
  years: FiltersYear[];
}

export interface FiltersYear {
  from: number;
  to: number;
  filter: string;
  decade: number;
  years: YearYear[];
  nofollow: boolean;
  count: number;
}

export interface YearYear {
  year: number;
  count: number;
  nofollow: boolean;
}
