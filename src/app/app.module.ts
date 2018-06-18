import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


//import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
//Routes
import { APP_ROUTES } from './app.routes';
//components
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';

//Services
import { UploadPhotosService } from './services/upload-photos.service';
import { environment } from '../environments/environment.prod';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    UploadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    
  ],
  providers: [
    UploadPhotosService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
