export class ClienteController {
  constructor(modelo) {
    this.modelo = modelo;
  }

  // Obtener todos los clientes
  getAll = async (req, res) => {
    try {
      const clientes = await this.modelo.getAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los clientes", detalle: error.message });
    }
  };

  // Obtener un cliente por ID
  getOneById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const cliente = await this.modelo.getOneById(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el cliente", detalle: error.message });
    }
  };

  // Crear un nuevo cliente
  create = async (req, res) => {
    try {
      const { nombre, antiguedad, sueldo } = req.body;

      if (!nombre || antiguedad == null || sueldo == null) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const nuevoCliente = await this.modelo.create(req.body);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el cliente", detalle: error.message });
    }
  };

  // Actualizar un cliente
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, antiguedad, sueldo } = req.body;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      if (!nombre || antiguedad == null || sueldo == null) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const clienteActualizado = await this.modelo.update(id, req.body);
      if (!clienteActualizado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json(clienteActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el cliente", detalle: error.message });
    }
  };

  // Eliminar un cliente
  delete = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const eliminado = await this.modelo.delete(id);
      if (!eliminado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.status(204).send(); // No devuelve contenido
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el cliente", detalle: error.message });
    }
  };
}
