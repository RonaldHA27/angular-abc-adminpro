import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

interface _HospitalUser{
    _id:string;
    nombre:string;
    img:string;
}

export class Hospital {

    constructor(
        public nombre:string,
        public _id:string,
        public img:string,
        public usuario:_HospitalUser,
    ){
    
    }

}