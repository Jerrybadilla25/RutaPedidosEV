// ruta para crear pedido
import {NextResponse} from 'next/server'
import { nanoid } from 'nanoid'
import User from '@/model/User'
import {connectDB} from '@/utils/dbserver'

export async function POST (request, {params}){
    try {
    await connectDB()
    // Generar un ID único
    const orderId = nanoid();
    const data = request.json()
    const user = await User.findById(params.idUser)
    console.log(user)
    return NextResponse.json({
        message: "orden creada",
        user
    })
    } catch (error) {
        return NextResponse.json({
            message:"no se pudo crear el pedido",
            status: 400
        })
    }
}

// falta crear la ruta de creacion de clientes y luego regresar a pedidos