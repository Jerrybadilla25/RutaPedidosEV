"use server";
import { addProduct } from "@/utils/definiciones";
import Producto from "@/model/Product";
import { createSku } from "@/utils/creteSku";
import { redirect } from "next/navigation";

export async function addProductDb(state, formData) {
  try {
    const validatedFields = addProduct.safeParse({
      codigo: formData.get("codigo"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      category: formData.get("category"),
      //stock: parseInt(formData.get("stock")),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    //const newSku = await createSku();
    const { codigo, name, description, price, category, stock } = validatedFields.data;
    const newProduct = new Producto({
      name,
      description,
      productId: codigo,
      price,
      category,
      //stock,
    });
    await newProduct.save();
    return {
      success: true,
      message: "¡Nuevo codigo creado!"
    };
    
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Error al crear el codigo."
    };
  }
  //redirect("/dashboard/products");
}
