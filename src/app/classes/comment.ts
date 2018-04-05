interface User {
	username:string;
	picture:string;
}

interface Replies {
	date:Date;
	user:User;
}

export class Comment {
	user: User;
	date: Date;
	replies?:Replies;
}