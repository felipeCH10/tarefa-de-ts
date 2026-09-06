import { readFile, writeFile } from "fs/promises";

type ItemEstoque = {
	id: number,
	nome: string,
	preco: number,
	quantidade: number
}

type RelatorioAuditoria = {
	valorTotalEstoque: number,
	produtosCriticos: ItemEstoque[]
}

readFile("./estoque.json", "utf8").then((conteudo: string) => JSON.parse(conteudo) as ItemEstoque[])
.then((estoque: ItemEstoque[]) => {
		const relatorio: RelatorioAuditoria = {
			valorTotalEstoque: estoque.reduce(
				(total: number, item: ItemEstoque) =>
					total + item.preco * item.quantidade,
				0,
			),
			produtosCriticos: estoque.filter(
				(item: ItemEstoque) => item.quantidade < 5,
			)
		}
		return writeFile("./auditoria.json", JSON.stringify(relatorio, null, 2));
	})
	.catch((erro: unknown) => {
		console.error("nao foi possivel concluir a auditoria:", erro);
	})