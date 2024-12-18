import { Schema, model, models } from 'mongoose';


const newSku = new Schema({
    sku : [{type: Number, unique: true}],
});

export default models.Sku || model('Sku', newSku);