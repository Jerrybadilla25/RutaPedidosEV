import { NextResponse } from "next/server"
import {connectDB} from '@/utils/dbserver'
import Producto from "@/model/Product"
import { nanoid } from 'nanoid'

export async function POST(request) {
    connectDB()
    try {
      // Generar un ID único
      const productId = nanoid(10);
      const data = await request.json()
      const nuevaData = {
          name:data.name,
          description:data.description,
          price:data.price,
          category:data.category,
          stock:data.stock,
          ratings:data.ratings,
          numReviews:data.numReviews,
          productId:productId
      }
      const newProducto = new Producto(nuevaData)
      const saveproducto = await newProducto.save();
      return NextResponse.json({
        message: "El producto se ha gusrdado correctamente",
        saveproducto,
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
}
