//ruta para crear pedido
import {NextResponse} from 'next/server'
import { nanoid } from 'nanoid'

export async function POST (request){
    try {
    // Generar un ID único
    const orderId = nanoid();
    const data = request.json()
    return NextResponse.json({
        message: "orden creada",
        data
    })
    } catch (error) {
        return NextResponse.json({
            message:"no se pudo crear el pedido",
            status: 400
        })
    }
}