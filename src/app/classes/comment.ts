import { Reply } from './reply';

type User = {
	username:string;
	picture:string;
}

export class Comment {
	user: User;
	date: Date;
	replies?:Reply[];
	body:string;
	movie_id: object;
	editing?:boolean;
}