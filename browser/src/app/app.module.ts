import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrMaskerModule } from 'br-mask';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ColorPickerModule } from 'ngx-color-picker';
import { AlterarVeiculoPage } from './alterar-veiculo/alterar-veiculo.page';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginaComponent } from './components/pagina/pagina.component';
import { IconeComponent } from './components/icone/icone.component';
import { PlayerGuiIndicatorComponent } from './components/player-gui-indicator/player-gui-indicator.component';
import { CriarVeiculoPage } from './criar-veiculo/criar-veiculo.page';
import { GerenciarVeiculoPage } from './gerenciar-veiculo/gerenciar-veiculo.page';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NickInvalidoPage } from './nick-invalido/nick-invalido.page';
import { PlayerGuiPage } from './player-gui/player-gui.page';
import { PlayersOnlinePage } from './players-online/players-online.page';
import {
  ApresentarAsyncDirective,
  CasoCarregandoDirective,
  CasoErroDirective,
  CasoResultadoDirective
} from './directives/apresentar-async.directive';
import { RegistroPage } from './registro/registro.page';
import { FilterPipe } from './pipes/filter.pipe';
import { BlinkDirective } from './directives/blink.directive';
import { VisualizarAnimacoesPage } from './visualizar-animacoes/visualizar-animacoes.page';

@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent,
    IconeComponent,
    PlayerGuiIndicatorComponent,
    PlayersOnlinePage,
    LoginPage,
    HomePage,
    RegistroPage,
    CriarVeiculoPage,
    NickInvalidoPage,
    PlayerGuiPage,
    GerenciarVeiculoPage,
    AlterarVeiculoPage,
    VisualizarAnimacoesPage,
    ApresentarAsyncDirective,
    CasoResultadoDirective,
    CasoCarregandoDirective,
    CasoErroDirective,
    FilterPipe,
    BlinkDirective,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule,
    ColorPickerModule,
    AutoCompleteModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
