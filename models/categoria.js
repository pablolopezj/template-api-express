import { Schema, model } from "mongoose";

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatario"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...categoria } = this.toObject();
  return categoria;
};

const Categoria = model("Categoria", CategoriaSchema);

export { Categoria };