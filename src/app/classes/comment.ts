type User = {
	username:string;
	picture:string;
}

type Replies = {
	date:Date;
	user:User;
	body:string;
}

export class Comment {
	user: User;
	date: Date;
	replies?:Replies;
	body:string;
	editing?:boolean
}