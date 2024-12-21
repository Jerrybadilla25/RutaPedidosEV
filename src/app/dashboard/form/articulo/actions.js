"use server";
import { addProduct } from "@/utils/definiciones";
//import {getUser} from '@/utils/dal'
//import Sku from "@/model/sku";
import Producto from "@/model/Product";
import { createSku } from "@/utils/creteSku";
//import { nanoid } from "nanoid"
import { redirect } from "next/navigation";

export async function addProductDb(state, formData) {
  try {
    const validatedFields = addProduct.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      category: formData.get("category"),
      stock: parseInt(formData.get("stock")),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const newSku = await createSku();
    const { name, description, price, category, stock } = validatedFields.data;
    const newProduct = new Producto({
      name,
      description,
      productId: newSku,
      price,
      category,
      stock,
    });
    await newProduct.save();
    redirect("/dashboard");
  } catch (error) {
    redirect("/dashboard/form/articulo")
  }
}
