"use server"
import {addProduct} from '@/utils/definiciones'
import {getUser} from '@/utils/dal'
import Sku from '@/model/sku'
import Producto from '@/model/Product'
import { nanoid } from "nanoid"
import {redirect} from 'next/navigation'

export async function addProductDb(state, formData) {
    const validatedFields = addProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        stock: parseInt(formData.get('stock')),
        

      })
      
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }
      
      const skus = await Sku.findById("675a31cafb358900b6b4f210")  
      let indice = skus.sku.length
      let ultimoSku = skus.sku[indice-1]
      let newSku = ultimoSku + 1
      skus.sku.push(newSku)
      await Sku.updateOne(skus)
      //const productId = nanoid(10)
      const {name, description, price, category, stock} = validatedFields.data
      const newProduct = new Producto({
        name, 
        description,
        productId : newSku,
        price,
        category,
        stock
      })
      await newProduct.save()
      redirect('/dashboard')
}
