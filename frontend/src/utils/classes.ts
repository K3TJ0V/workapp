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
export class Workout{
    id:number;
    descriptive_name:string | undefined;
    constructor(id: number, descriptive_name?:string){
        this.id = id;
        this.descriptive_name = descriptive_name
    }
}

// regexes
const tempo_regex = /[0-9]{4}/
const rir_regex = /[0-9]-[0-9]|[0-9]/

export class WorkoutItem{
    id: number;
    sets: number;
    exercise: string;
    workout: number;
    weight: number | undefined;
    reps: number | undefined;
    time: number | undefined;
    private _tempo: string | undefined;
    private _rir : string | undefined;
    constructor(id: number, sets: number, exercise: string, workout: number, weight?:number, reps?:number, time?:number, tempo?:string, rir?:string){
        this.id = id;
        this.sets = sets;
        this.exercise = exercise;
        this.workout = workout;
        this.weight = weight;
        this.reps = reps;
        this.time = time;
        tempo ? this.tempo = tempo : null
        rir ? this.rir = rir : null
    }
    get tempo(){
        if(!this._tempo){
            return "Tempo is not set"
        }
        return this._tempo
    }
    get rir(){
        if(!this._rir){
            return "Rir is not set"
        }
        return this._rir
    }
    set tempo(new_val:string){
        const valid = tempo_regex.test(new_val);
        if(valid){
            this._tempo = new_val
        }else{
            console.log("bad format of tempo")
        }
    }
    set rir(new_val:string){
        const valid = rir_regex.test(new_val);
        if(valid){
            this._rir = new_val
        }else{
            console.log("bad format of rir")
        }
    }
}