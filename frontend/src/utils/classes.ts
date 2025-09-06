export class Exercise{
    id:number;
    name:string;
    description:string | undefined;
    video:string | undefined;
    comment:string | undefined;
    constructor(id:number, name:string, desc?:string, video?:string, comment?:string){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.video = video;
        this.comment = comment;
    }
}