"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const BehaviorSubject_1 = require("rxjs/internal/BehaviorSubject");
const brazucas_eventos_1 = require("../../../../packages/rpg/interfaces/brazucas-eventos");
let RagempService = class RagempService {
    constructor(zone) {
        this.zone = zone;
        this.browserName$ = new BehaviorSubject_1.BehaviorSubject(null);
        this.dadosJogador$ = new BehaviorSubject_1.BehaviorSubject({
            nome: '',
            email: '',
            celular: '',
            senha: '',
            dinheiro: 0,
            creditos: 0,
            fome: 0,
            sono: 77,
            forcaFisica: 0,
            sede: 0,
        });
        this.playerName$ = new BehaviorSubject_1.BehaviorSubject(null);
        this.jogadorLocal$ = new BehaviorSubject_1.BehaviorSubject(null);
        this.serverEvent$ = new rxjs_1.Subject();
        this.voiceChatListeners$ = new BehaviorSubject_1.BehaviorSubject([]);
        this.playerGuiMenuAtivo = new BehaviorSubject_1.BehaviorSubject(false);
        if (!window) {
            window = {};
        }
        window.my = window || {};
        window.ragemp = window.ragemp || {};
        window.ragemp.setPlayerName = this.setPlayerName.bind(this);
        window.ragemp.setBrowserName = this.setBrowserName.bind(this);
        window.ragemp.setVoiceChatListeners = this.setVoiceChatListeners.bind(this);
        window.ragemp.setPlayerData = this.setPlayerData.bind(this);
        window.ragemp.togglePlayerGuiMenuAtivo = this.togglePlayerGuiMenuAtivo.bind(this);
        window.ragemp[brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR] = this[brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR].bind(this);
        window.ragemp.serverEvent = this.serverEvent.bind(this);
    }
    callRagempEvent(event, data) {
        return new Promise((resolve, reject) => {
            const eventId = Math.round(Math.random() * 10000000);
            mp.trigger(brazucas_eventos_1.BrazucasEventos.BROWSER, eventId, event, JSON.stringify(data));
            const subscriber = this.serverEvent$.subscribe((serverEvent) => {
                console.debug(`[EVENTO] (ID ${eventId}) ${JSON.stringify(serverEvent)}`);
                if (typeof this[serverEvent.event] === 'function') {
                    this[serverEvent.event](serverEvent.data);
                }
                if (serverEvent.eventId === eventId) {
                    clearTimeout(timeout);
                    resolve(serverEvent.data);
                    subscriber.unsubscribe();
                }
            });
            const timeout = setTimeout(() => {
                subscriber.unsubscribe();
                reject('timeout');
            }, 10000);
        });
    }
    setPlayerName(playerName) {
        this.playerName$.next(playerName);
    }
    setBrowserName(browserName) {
        this.browserName$.next(browserName);
    }
    setVoiceChatListeners(listenersList) {
        this.voiceChatListeners$.next(listenersList);
    }
    setPlayerData(dadosJogadorStr) {
        const dadosJogador = JSON.parse(dadosJogadorStr);
        console.log(`ATUALIZAR DADOS JOGADOR (${this.browserName$.value}) ${JSON.stringify(dadosJogador)}`);
        this.zone.run(() => {
            this.dadosJogador$.next(dadosJogador);
        });
    }
    serverEvent(eventId, event, data) {
        console.log(`Evento recebido para o navegador ${this.browserName$.value}: ${event} ${JSON.stringify(data)}`);
        this.serverEvent$.next({
            event: event,
            data: data,
            eventId: eventId,
        });
    }
    togglePlayerGuiMenuAtivo() {
        this.zone.run(() => {
            this.playerGuiMenuAtivo.next(!this.playerGuiMenuAtivo.value);
            if (this.playerGuiMenuAtivo) {
                mp.trigger('HabilitarCursor');
            }
            else {
                mp.trigger('DesabilitarCursor');
            }
        });
    }
    closeBrowser() {
        mp.trigger('FecharBrowser', this.browserName$.value);
    }
    [brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR](jogador) {
        console.log(`[DADOS JOGADOR] ${JSON.stringify(jogador)}`);
        this.zone.run(() => {
            this.dadosJogador$.next(Object.assign(this.dadosJogador$.value, JSON.parse(jogador)));
        });
    }
};
RagempService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], RagempService);
exports.RagempService = RagempService;
//# sourceMappingURL=ragemp.service.js.map