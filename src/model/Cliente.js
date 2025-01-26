import { Schema, model, models } from "mongoose";

const newCliente = new Schema(
  {
    clientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String,required: true, default: "actualizar@gmail.com" },
    contact: { type: String,required: true, default: "actualizar" },
    cel: { type: String,required: true, default: "00000000" },
    cedJuridica: { type: String, required: false },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pedido",
      },
    ],
    address: {
      provincia: { type: String,required: true, default: "N/A" },
      canton: { type: String,required: true, default: "N/A" },
      distrito: { type: String,required: true, default: "N/A" },
      direccion: { type: String,required: true, default: "N/A" },
    },
    createdAt: { type: Date, default: Date.now },
    zona: { type: String, required: true },
    status: { type: String, default: "Activo" },
    typePay: { type: String, default: "contado" },
    desc: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Cliente || model("Cliente", newCliente);

