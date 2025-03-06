import Scanner from "@codeea/scanner";
import pgp from "pg-promise";

async function main() {
  const scanner = new Scanner();

  // Criar um objeto de conexão com o banco
  const connectionString =
    "postgres://postgres:password@localhost:5432/matriculas_db";

  const connection = pgp()(connectionString);
  try {
    // Monta a query de inserção
    const queryInsertAlunos = `
      insert into alunos (nome, data_nascimento, cpf,
        telefone, sexo, email, escolaridade, renda, pcd)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    // Insere os dados no banco
    await connection.query(queryInsertAlunos, [
      "Manezinho da Ilha",
      "1990-04-20",
      "12345678903",
      "47999990420",
      "M",
      "omanezinho@hotmail.com",
      "ensino médio",
      1518.0,
      false,
    ]);

    // Busca os dados no banco
    const results = await connection.query("select id, nome, cpf from alunos");

    // Imprime os dados
    console.log(results);
  } catch (error) {
    // Imprime o erro
    console.log(error)
  }

  scanner.close();
}

(async () => {
  await main();
})();
