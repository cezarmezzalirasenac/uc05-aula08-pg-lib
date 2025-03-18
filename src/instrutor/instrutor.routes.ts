import express, { Router } from "express";
import { InstrutorRepository } from "./instrutor.repository";
import { InstrutorService } from "./instrutor.service";
import { InstrutorController } from "./instrutor.controller";

export class InstrutorRoutes {
  private database: any;
  private router: Router;

  private repository: InstrutorRepository;
  private service: InstrutorService;
  private controller: InstrutorController;

  constructor(database: any) {
    this.database = database;
    this.repository = new InstrutorRepository(this.database);
    this.service = new InstrutorService(this.repository);
    this.controller = new InstrutorController(this.service);
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get("/", (req, res) => this.controller.getAll(req, res));
    this.router.post("/", (req, res) => {});
    this.router.patch("/", (req, res) => {});
    this.router.delete("/", (req, res) => {});
  }

  getRouter(): Router {
    return this.router;
  }
}
