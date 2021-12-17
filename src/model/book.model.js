import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  titulo: { type: String, required: true }, // String is shorthand for {type: String}
  descripcion: { type: String },
  npaginas: { type: Number },
  capitulos: { type: Number },
  ejemplares: { type: Number, default: 1},
  state: { type: Boolean, default: true },
});

export default model('Book', BookSchema);