import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController.js";

export const EnrutadorCliente = (modelo) => {
  const controlador = new ClienteController(modelo);
  const clienteRouter = Router();

  clienteRouter.get("/", controlador.getAll);
  clienteRouter.get("/:id", controlador.getOneById);
  clienteRouter.post("/", controlador.create);
  clienteRouter.put("/:id", controlador.update);
  clienteRouter.delete("/:id", controlador.delete);

  return clienteRouter;
};
