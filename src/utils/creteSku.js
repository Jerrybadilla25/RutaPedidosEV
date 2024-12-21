import Sku from "@/model/sku";

export async function createSku() {
  const codeMax = 399999;
  try {
    const skus = await Sku.findById("675a31cafb358900b6b4f210").select("sku");
    let indice = skus.sku.length;
    let ultimoSku = skus.sku[indice - 1];
    let newSku = ultimoSku + 1;
    if (newSku <= codeMax) {
      skus.sku.push(newSku);
      await Sku.updateOne(skus);
      return newSku;
    } else {
      return { msj: "El numero supera el limite establecido" };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function createDelivery() {
  const codeMax = 799999;
  try {
    const entrega = await Sku.findById("675a31cafb358900b6b4f210").select(
      "delivery"
    );
    let indice = entrega.delivery.length;
    let ultimoEntrega = entrega.delivery[indice - 1];
    let newDelivery = ultimoEntrega + 1;
    if (newDelivery <= codeMax) {
      entrega.delivery.push(newDelivery);
      await Sku.updateOne(entrega);
      return newDelivery;
    } else {
      return { msj: "El numero supera el limite establecido" };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function createIdClient() {
  const codeMax = 499999;
  try {
    const idcliente = await Sku.findById("675a31cafb358900b6b4f210").select(
      "idCliente"
    );
    let indice = idcliente.idCliente.length;
    let ultimoIdCliente = idcliente.idCliente[indice - 1];
    let newIdCliente = ultimoIdCliente + 1;
    if (newIdCliente <= codeMax) {
      idcliente.idCliente.push(newIdCliente);
      await Sku.updateOne(idcliente);
      return newIdCliente;
    } else {
      return { msj: "El numero supera el limite establecido" };
    }
  } catch (error) {
    return { error: error };
  }
}
