import { Turma } from "../shared/model/turma.model";

export class TurmaRepository {
  private database: any;

  constructor(database: any) {
    this.database = database;
  }

  async create(turma: Turma): Promise<Turma> {
    const statamentInsert = `
      INSERT INTO public.turmas
        (id, codigo_turma, carga_horaria, valor, vagas, data_inicio, curso_id, instrutor_id)
      VALUES(0, '', 0, 0, 0, '', 0, 0)
      RETURNIN id;
    `;
    return turma;
  }

  async getAll(): Promise<Turma[]> {
    return [] as Turma[];
  }
}
