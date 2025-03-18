import { Instrutor } from "../shared/model/instrutor.model";
import { InstrutorRepository } from "./instrutor.repository";

export class InstrutorService {
  private repository: InstrutorRepository;

  constructor(repository: InstrutorRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Instrutor[]> {
    return this.repository.getAll()
  }
}
