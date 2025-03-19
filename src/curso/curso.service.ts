import { Curso } from "../shared/model/curso.model";
import { CursoRepository } from "./curso.repository";

export class CursoService {
  private repository: CursoRepository;

  constructor(repository: CursoRepository) {
    this.repository = repository;
  }

  async create(curso: Curso): Promise<Curso> {
    return this.repository.create(curso);
  }

  async getAll(): Promise<Curso[]> {
    return this.repository.getAll();
  }
}
