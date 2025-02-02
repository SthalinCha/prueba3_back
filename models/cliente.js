import mongoose from "mongoose";

// Definir el esquema de cliente
const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  antiguedad: { type: Number, required: true },
  sueldo: { type: Number, required: true },
  bono: { type: Number, required: true },
});

// Modelo de cliente
export const ClienteModel = mongoose.model("Cliente", ClienteSchema);

// Clase Cliente con métodos estáticos para interactuar con la base de datos
export class Cliente {
  // Método para calcular el bono mayor
  static calcularBono(sueldo, antiguedad) {
    let bonoAntiguedad = 0;
    if (antiguedad > 2 && antiguedad < 5) {
      bonoAntiguedad = sueldo * 0.2;
    } else if (antiguedad >= 5) {
      bonoAntiguedad = sueldo * 0.3;
    }

    let bonoSueldo = 0;
    if (sueldo < 1000) {
      bonoSueldo = sueldo * 0.25;
    } else if (sueldo <= 3500) {
      bonoSueldo = sueldo * 0.15;
    } else {
      bonoSueldo = sueldo * 0.10;
    }

    return Math.max(bonoAntiguedad, bonoSueldo);
  }

  // Obtener todos los clientes
  static async getAll() {
    return await ClienteModel.find();
  }

  // Obtener un cliente por ID
  static async getOneById(id) {
    return await ClienteModel.findById(id);
  }

  // Crear un nuevo cliente con cálculo de bono
  static async create(data) {
    data.bono = this.calcularBono(data.sueldo, data.antiguedad);
    const nuevoCliente = new ClienteModel(data);
    return await nuevoCliente.save();
  }

  // Actualizar un cliente y recalcular el bono
  static async update(id, data) {
    data.bono = this.calcularBono(data.sueldo, data.antiguedad);
    return await ClienteModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar un cliente
  static async delete(id) {
    return await ClienteModel.findByIdAndDelete(id);
  }
}
