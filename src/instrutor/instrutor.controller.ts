import { Request, Response } from "express";
import { InstrutorService } from "./instrutor.service";
import { Instrutor } from "../shared/model/instrutor.model";

export class InstrutorController {

    private service: InstrutorService;

    constructor(service: InstrutorService) {
      this.service = service;
    }

    async getAll(_: Request, res: Response<Instrutor[]>): Promise<void> {
      const instrutores = await this.service.getAll();
      if (instrutores.length === 0) {
        res.status(404).send([]);
        return;
      }

      res.status(200).send(instrutores)
    }
}
