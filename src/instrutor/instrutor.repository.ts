import { Instrutor } from "../shared/model/instrutor.model";

export class InstrutorRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(instrutor: Instrutor) {
    const statementInsert = `
      INSERT INTO public.instrutores
      (id, nome, cpf, data_nascimento, matricula, sexo, email, data_admissao, data_desligamento)
      VALUES(0, '', '', '', '', '', '', '', '');`;
  }

  async getAll(): Promise<Instrutor[]> {
    const statementSelectAll = `
      SELECT
        id, nome, cpf,
        data_nascimento, matricula, sexo,
        email, data_admissao, data_desligamento
      FROM public.instrutores
    `;
    const result = await this.database.query(statementSelectAll, []);
    if (result.length === 0) {
      return [];
    }
    return result.map((instrutor: Instrutor) => {
      return { ...instrutor };
    });
  }
}
