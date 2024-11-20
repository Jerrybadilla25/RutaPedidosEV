import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import User from "@/model/User";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";

export async function POST(request) {
  try {
    // Conectar a la base de datos
    connectDB();
    // Leer el cuerpo de la solicitud antes de acceder a `params`

    // Buscar el usuario en la base de datos usando `userId`
    const data = await request.json();
    const {
      userCreator,
      name,
      direccion,
      contact,
      cel,
      email,
      provincia,
      canton,
      distrito,
      cedJuridica,
    } = data;
    const clientId = nanoid(10);
    const user = await User.findById(userCreator).select("user").exec();
    const address = {
      provincia,
      canton,
      distrito,
      direccion,
    };

    const ClienteForm = {
      clientId,
      clientId,
      userCreator: user.user,
      name: name,
      contact: contact,
      cel: cel,
      email: email,
      cedJuridica: cedJuridica,
      address: address,
    };

    if (user === null) {
      return NextResponse.json({
        message: "No tiene permiso para crear clientes",
        status: 400,
      });
    }

    const newCliente = new Cliente(ClienteForm);
    const newClient = await newCliente.save();
    return NextResponse.json({
      message: "Cliente creado",
      newClient,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "No se pudo crear el cliente",
      status: 400,
    });
  }
}
