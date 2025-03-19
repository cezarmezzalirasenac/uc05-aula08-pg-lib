import express, { Router } from "express";
import { CursoRepository } from "./curso.repository";
import { CursoService } from "./curso.service";
import { CursoController } from "./curso.controller";

export class CursoRouter {
  private database: any;
  private router: Router;

  private repository: CursoRepository;
  private service: CursoService;
  private controller: CursoController;

  constructor(database: any) {
    this.database = database;
    this.repository = new CursoRepository(this.database);
    this.service = new CursoService(this.repository);
    this.controller = new CursoController(this.service);
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get("/", (req, res) => this.controller.getAll(req, res));
    this.router.post("/", (req, res) => this.controller.create(req, res));
    this.router.patch("/", (req, res) => {});
    this.router.delete("/", (req, res) => {});
  }

  getRouter(): Router {
    return this.router;
  }
}
