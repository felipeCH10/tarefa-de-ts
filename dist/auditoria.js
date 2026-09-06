"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
(0, promises_1.readFile)("./estoque.json", "utf8").then((conteudo) => JSON.parse(conteudo))
    .then((estoque) => {
    const relatorio = {
        valorTotalEstoque: estoque.reduce((total, item) => total + item.preco * item.quantidade, 0),
        produtosCriticos: estoque.filter((item) => item.quantidade < 5)
    };
    return (0, promises_1.writeFile)("./auditoria.json", JSON.stringify(relatorio, null, 2));
})
    .catch((erro) => {
    console.error("nao foi possivel concluir a auditoria:", erro);
});
