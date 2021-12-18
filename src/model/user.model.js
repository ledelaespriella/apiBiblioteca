import { Schema, model, ObjectId } from 'mongoose';

const UserSchema = new Schema({
  nombre: { type: String, required: true }, // String is shorthand for {type: String}
  email: { type: String },
  password: { type: String },
  rol: { type: String, default: 'CLIENT' },
  state: { type: Boolean, default: true },
  prestamos: [
    {
      book_id: {type: ObjectId, ref: 'Book'},
      dateInit: Date,
      dateFinish: Date,
    },
  ],
});

export default model('User', UserSchema);