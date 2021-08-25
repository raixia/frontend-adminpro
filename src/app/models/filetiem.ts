export class fileItem {
    public archivo:File;
    public nombre:string;
    public url:string;
 
    constructor(archivo:File){
        this.archivo=archivo;
        this.nombre=archivo.name;
        this.url='';
    }
}
