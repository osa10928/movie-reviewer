type User = {
	username:string;
	picture:string;
}

export class Reply {
	date:Date;
	user:User;
	body:string;
}