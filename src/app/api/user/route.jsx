import { NextResponse } from 'next/server';
import {connectDB} from '@/utils/dbserver'
import User from '@/model/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  connectDB()
  try {
    // Extraer los datos enviados en la solicitud
    const data = await request.json();

    // Simulación de creación de usuario (aquí puedes usar Mongoose para guardar en MongoDB)
    const { user, email, password } = data;

    if (!user || !email || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    

   // Encriptar la contraseña
   const hashedPassword = await bcrypt.hash(password, 10);

   // Crear el usuario en la base de datos con la contraseña encriptada
   const dataUser = new User({
     user,
     email,
     password: hashedPassword
   });
   const saveData = await dataUser.save();

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', user: { user:saveData.user, email:saveData.email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear el usuario', error: error.message },
      { status: 500 }
    );
  }
}