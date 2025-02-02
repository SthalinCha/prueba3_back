export class ClienteController {
    constructor(modelo) {
      this.modelo = modelo;
    }
  
    getAll = async (req, res) => {
      try {
        const clientes = await this.modelo.getAll();
        res.json(clientes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getOneById = async (req, res) => {
      try {
        const cliente = await this.modelo.getOneById(req.params.id);
        if (!cliente) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(cliente);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  
    create = async (req, res) => {
      try {
        const nuevoCliente = await this.modelo.create(req.body);
        res.status(201).json(nuevoCliente);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  
    update = async (req, res) => {
      try {
        const clienteActualizado = await this.modelo.update(req.params.id, req.body);
        if (!clienteActualizado) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(clienteActualizado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  
    delete = async (req, res) => {
      try {
        const eliminado = await this.modelo.delete(req.params.id);
        if (!eliminado) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  }
  