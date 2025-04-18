import { Schema, model, models } from 'mongoose';

const newUser = new Schema({
    user : {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    fecha: { type: Date, default: Date.now},
    role: {
        type: String,
        enum: ['seller', 'approver', 'picker', 'invoicer', 'shipper', 'master', 'user'],
        default: "user",
      },
   
});

export default models.User || model('User', newUser);

