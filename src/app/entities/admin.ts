export class Admin {

    id: number;
    tipodocumento: string;
    documento: number;
    nombres: string;
    apellidos: string;
    genero: string;
    celular: string;
    telefonofijo: string;
    codigopostal: number;
    fechanacimiento: Date;
    edad: number;
    pais: number;
    departamento: number;
    ciudad: number;
    fotoadmin: string;
    fotoced1: string;
    fotoced2: string;
    direccion: string;
    correo: string;
    jefeinmediato: string;

    constructor(){
        this.id=0;
        this.tipodocumento=null;
        this.documento=0;
        this.nombres=null;
        this.apellidos=null;
        this.genero=null;
        this.celular=null;
        this.telefonofijo=null;
        this.codigopostal=0;
        this.fechanacimiento=null;
        this.edad=null;
        this.pais=0;
        this.departamento=0;
        this.ciudad=0;
        this.fotoadmin=null;
        this.fotoced1=null;
        this.fotoced2=null;
        this.direccion=null;
        this.correo=null;
        this.jefeinmediato=null;
    }
}
