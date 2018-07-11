export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string,
        public uid?: string,
        public estado?: string,
        public notificaciaones?: boolean,
        public condiciones?:boolean
    ) { }
}