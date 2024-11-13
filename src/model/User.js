import { Schema, model, models } from 'mongoose';

const newUser = new Schema({
    user : {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    fecha: { type: Date, default: Date.now},
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "rol"
    }]
});

export default models.User || model('User', newUser);