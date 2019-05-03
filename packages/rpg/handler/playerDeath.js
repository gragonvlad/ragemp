"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const death_reason_1 = require("../interfaces/death-reason");
function PlayerDeathHandler(player, reason, killer) {
    console.debug(`!{FF0000}[MORTE]!{FFFFFF} ${killer.name} matou ${player.name} (${reason}) (${death_reason_1.razaoMorte(reason)})`);
    mp.players.broadcast(`[MORTE] ${killer.name} matou ${player.name} (${death_reason_1.razaoMorte(reason)})`);
    player.spawn(player.position);
}
exports.PlayerDeathHandler = PlayerDeathHandler;
//# sourceMappingURL=playerDeath.js.map