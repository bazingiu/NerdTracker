import { Request } from "express";
import { MovieData } from "./MovieTypes";
import { BookData } from "./BookTypes";
import { TVShowData } from "./TVShowTypes";

// Request types for each entity
export interface MovieRequest extends Request {
  body: MovieData;
}

export interface BookRequest extends Request {
  body: BookData;
}

export interface TVShowRequest extends Request {
  body: TVShowData;
}
