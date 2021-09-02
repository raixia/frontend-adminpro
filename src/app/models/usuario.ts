

export class usuario {
    constructor(

       public nombre:string,
       public correo:string, 
       public password:string,
       public rol?:string,
       public img?:string[],
       public uid?:string,
      
      
    ) {
        
    }
    imprimirUsuario(){
        console.log(this.nombre)
    }
    get imagenUrl(){
        if(this.img?.length==0){
            return 'https://laverdadnoticias.com/__export/1619798871248/sites/laverdad/img/2021/04/30/series_anime_kawaii_recomendaciones.jpg_2039590105.jpg'
        }else{
            return this.img![0]
        }

    }
}