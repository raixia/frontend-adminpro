

export class usuario {
    constructor(

       public nombre:string,
       public correo:string, 
       public password:string,
       public rol?:string,
       public img?:string[],
       public uid?:string,
       public estado?:string,
      
      
    ) {
        
    }
    imprimirUsuario(){
        console.log(this.nombre)
    }
    get imagenUrl(){
        
        if(!this.img){
            return  'https://png.pngtree.com/png-clipart/20190610/original/pngtree-userpeoplelinear-iconuser-png-image_1859764.jpg'
        }else if(this.img?.length==0){
            return 'https://png.pngtree.com/png-clipart/20190610/original/pngtree-userpeoplelinear-iconuser-png-image_1859764.jpg'
        }else{
            return this.img![0]
        }

    }
}