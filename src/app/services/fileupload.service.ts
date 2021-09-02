import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { usuario } from '../models/usuario';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  constructor() { }
  async actualizarFoto(archivo: File, uid: string) {

    try {
      const url = `${base_url}/uploads/${uid}`
      const formData = new FormData();
      formData.append('img', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        body: formData
      })
      console.log(resp)
      const data=  await resp.json()
        if(data.ok){
      //    return data.imagenes[0]
       //   console.log(usuario)
        return data.imagenes[0]
        }else{
          console.log(data.msg)
          return false
        }
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
