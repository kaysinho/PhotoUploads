import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FilePhoto } from '../models/file-photo';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input()files:FilePhoto[]=[]
  @Output() mouseUp: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event:any){
    this.mouseUp.emit(true)
    this._prevent(event)

  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event:any){
    this.mouseUp.emit(false)
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any){

    const transfer = this._getTransfer(event)

    if (!transfer){
      return
    }
    
    this._extractFiles(transfer.files)
    this._prevent(event)
    this.mouseUp.emit(false)
    
  }

  private _getTransfer(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer
  }

  private _extractFiles(filesList:FileList){
    for (const property in Object.getOwnPropertyNames(filesList)){
      const tempFile = filesList[property]

      if (this._fileTrue(tempFile)){
        const fileNew = new FilePhoto(tempFile)
        this.files.push(fileNew)
      }
    }
    console.log(this.files)
  }

  /*Validations*/
  private _fileTrue(file:File):boolean{
    if (!this._existFile(file.name) && this._isImage(file.type)){
      return true
    }else{
      return false
    }
  }

  private _prevent(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _existFile(name:string):boolean{
    for (const file of this.files){
      if (file.name == name){
        console.log(`File ${name} exist`)
        return true
      }
    }
    return false
  }

  private _isImage(type:string):boolean{
    return (type==undefined || type=='')?false : type.startsWith('image') 
  }
}
