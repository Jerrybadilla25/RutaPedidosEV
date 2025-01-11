"use server";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";
import { redirect } from "next/navigation";

export async function getHistoryClient(history) {
  try {
    await connectDB();
    const clientes = await Cliente.find({
      name: { $regex: history, $options: "i" },
    }).lean().populate("items");
    //const clientesReverse = clientes.reverse();
    return clientes;
  } catch (error) {
    return { message: "error" };
  }
}