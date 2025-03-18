import express, { Express, Response } from "express";
import cors from "cors";
import { AlunoRouter } from "./aluno/aluno.router";
import { Database } from "./shared/database";
import { InstrutorRoutes } from "./instrutor/instrutor.routes";

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
    const instrutorRoutes = new InstrutorRoutes(this.database);

    this._app.use("/alunos", alunoRouter.getRouter());
    this._app.use("/instrutores", instrutorRoutes.getRouter())
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
