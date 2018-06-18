import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { FilePhoto } from '../models/file-photo';
@Injectable({
  providedIn: 'root'
})
export class UploadPhotosService {
  private FOLDER_IMG='img'
  constructor(private db:AngularFirestore) { }

  savePhoto(photo:{name:string, url:string}){
    this.db.collection(`/${this.FOLDER_IMG}`).add(photo)
  }

  loadPhotos(photos:FilePhoto[]){
    const storageRef = firebase.storage().ref()
    for (const photo of photos){

      photo.uploading = true

      if(photo.progress>=100){
        continue
      }

      const refImage = storageRef.child( `${ this.FOLDER_IMG }/${ photo.name }` );

      const uploadTask:firebase.storage.UploadTask = refImage.put( photo.file );

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot)=>{
          photo.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        },
        (err)=>{
          console.log('Error al subir la foto', err)
        },
        ()=>{
          refImage.getDownloadURL().then(
            ( urlImagen ) => {
                console.log('Imagen cargada correctamente');
                photo.url = urlImagen;
                photo.uploading = false;
                this.savePhoto({
                    name: photo.name,
                    url: photo.url
                });
            },
            ( error ) => console.log('No existe la URL')
        )
        }
      )

    }
    
  }
}
