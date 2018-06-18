export class FilePhoto {
    public file:File;
    public name:string;
    public url:string;
    public uploading:boolean;
    public progress:number;
    constructor(file:File){
        this.file = file
        this.name = file.name
        this.uploading = false
        this.progress = 0
    }
}
