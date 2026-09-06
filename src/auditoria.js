"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
(0, promises_1.readFile)("./estoque.json", "utf8").then(function (conteudo) { return JSON.parse(conteudo); })
    .then(function (estoque) {
    var relatorio = {
        valorTotalEstoque: estoque.reduce(function (total, item) {
            return total + item.preco * item.quantidade;
        }, 0),
        produtosCriticos: estoque.filter(function (item) { return item.quantidade < 5; })
    };
    return (0, promises_1.writeFile)("./auditoria.json", JSON.stringify(relatorio, null, 2));
})
    .catch(function (erro) {
    console.error("nao foi possivel concluir a auditoria:", erro);
});
