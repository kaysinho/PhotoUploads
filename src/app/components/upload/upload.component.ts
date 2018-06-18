import { Component, OnInit } from '@angular/core';
import { FilePhoto } from '../../models/file-photo';
import { UploadPhotosService } from '../../services/upload-photos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  mouseUp:boolean=false
  files:FilePhoto[]=[]
  constructor(private _up:UploadPhotosService) { }

  ngOnInit() {
  }

  uploadPhotos(){
    this._up.loadPhotos(this.files)
  }

  cleanFiles(){
    this.files = []
  }

}
