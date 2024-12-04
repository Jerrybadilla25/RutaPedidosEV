import { Schema, model, models } from 'mongoose';

const newRol = new Schema({
    rol: {type: String} 
});

export default models.Rol || model('Rol', newRol);