import { Schema, model, models } from 'mongoose';


const newSku = new Schema({
    sku : [{type: Number, unique: true}],//crea codigo de articulo
    delivery : [{type: Number, unique: true}],//crea numero de entrega, pedido
    idCliente : [{type: Number, unique: true}],//crea numero de entrega, pedido
});

export default models.Sku || model('Sku', newSku);