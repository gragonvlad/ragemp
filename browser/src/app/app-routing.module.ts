import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlterarVeiculoPage } from './alterar-veiculo/alterar-veiculo.page';
import { CriarVeiculoPage } from './criar-veiculo/criar-veiculo.page';
import { GerenciarVeiculoPage } from './gerenciar-veiculo/gerenciar-veiculo.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { NickInvalidoPage } from './nick-invalido/nick-invalido.page';
import { PlayerGuiPage } from './player-gui/player-gui.page';
import { PlayersOnlinePage } from './players-online/players-online.page';
import { RegistroPage } from './registro/registro.page';
import { VisualizarAnimacoesPage } from './visualizar-animacoes/visualizar-animacoes.page';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'players-online', component: PlayersOnlinePage},
  {path: 'registro', component: RegistroPage},
  {path: 'criar-veiculo', component: CriarVeiculoPage},
  {path: 'nick-invalido', component: NickInvalidoPage},
  {path: 'player-gui', component: PlayerGuiPage},
  {path: 'gerenciar-veiculo', component: GerenciarVeiculoPage},
  {path: 'alterar-veiculo', component: AlterarVeiculoPage},
  {path: 'visualizar-animacoes', component: VisualizarAnimacoesPage},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
