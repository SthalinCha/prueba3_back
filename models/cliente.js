import mongoose from "mongoose";

// Definir el esquema de cliente
const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  sueldo: { type: Number, required: true },
  bono1: { type: Number, required: true },
  bono2: { type: Number, required: true },
});

export const ClienteModel = mongoose.model("Cliente", ClienteSchema);

// Clase Cliente con métodos estáticos para interactuar con la base de datos
export class Cliente {
  static async getAll() {
    return await ClienteModel.find();
  }

  static async getOneById(id) {
    return await ClienteModel.findById(id);
  }

  static async create(data) {
    const nuevoCliente = new ClienteModel(data);
    return await nuevoCliente.save();
  }

  static async update(id, data) {
    return await ClienteModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await ClienteModel.findByIdAndDelete(id);
  }
}
