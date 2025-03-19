import express, { Express, Response } from "express";
import cors from "cors";
import { AlunoRouter } from "./aluno/aluno.router";
import { Database } from "./shared/database";
import { InstrutorRouter } from "./instrutor/instrutor.router";
import { CursoRouter } from "./curso/curso.router";

class App {
  private readonly PORT = 3000;
  private _app: Express;
  private database: any;

  constructor() {
    this._app = express();
  }

  public configure() {
    // Conecta com o banco de dados
    this.database = new Database();

    // Configura o app para receber e enviar com JSON
    this._app.use(express.json());

    this._app.use(cors());

    // Rotas
    this._app.get("/health", (_, res: Response) => {
      res.send({ status: "OK" });
    });

    const alunoRouter = new AlunoRouter(this.database);
    const instrutorRouter = new InstrutorRouter(this.database);
    const cursoRouter = new CursoRouter(this.database);

    this._app.use("/alunos", alunoRouter.getRouter());
    this._app.use("/instrutores", instrutorRouter.getRouter());
    this._app.use("/cursos", cursoRouter.getRouter());
  }

  public start() {
    this._app.listen(this.PORT, (error) => {
      if (error) {
        console.log(error);
      }
      console.log(`Servidor iniciado na porta ${this.PORT}`);
    });
  }

  public async stop() {
    await this.database.closeConnection();
  }
}

export const app = new App();
