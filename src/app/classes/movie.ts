import { Comment } from './comment';

export class Movie {
  movieTitle:string;
  year:number;
  imdb?:string;
  imdbRating?:number;
  trailer?:string;
  reviewTitle?:string;
  reviewClip?:string;
  reviewSummary?:string;
  reviewScore:number;
  createdAt?:Date;
  bestWeek:boolean;
  bestMonth:boolean;
  poster?:string;
  comments?:Comment[];
}
