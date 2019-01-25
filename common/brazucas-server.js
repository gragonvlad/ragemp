"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/of");
const forkJoin_1 = require("rxjs/internal/observable/forkJoin");
const Sequelize = require("sequelize");
const database_1 = require("./database/database");
const Usuario_1 = require("./database/models/Usuario");
class BrazucasServer {
    constructor() {
        this.database = new database_1.Database();
    }
    onload() {
        return forkJoin_1.forkJoin(...[
            this.database.sync(),
            this.database.authenticate(),
        ]);
    }
    loadPlayer(playerName) {
        const Op = Sequelize.Op;
        return Usuario_1.Usuario.findOne({ where: { nome: { [Op.eq]: playerName } } });
    }
}
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map