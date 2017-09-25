import { SimpleListTemplateModule } from './components/template/list/simple-list/simple-list.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { ClarityModule } from 'clarity-angular';
import { NglModule } from 'ng-lightning';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MasterDetailTemplateModule } from './components/template/master-detail/master-detail.module';
import { SearchBarTemplateModule } from './components/template/search-bar/concrete/search-bar.template.module';
import { LayoutComponent } from './view/layout/layout.component';

/**
 * The NgModule is where all modules for the app-module are loaded
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NglModule.forRoot(),
    ClarityModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'internations-project'),
    MasterDetailTemplateModule,
    SearchBarTemplateModule,
    SimpleListTemplateModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
