"use client";
import { useActionState, useFormStatus } from "react";
import {addProductDb} from '@/app/dashboard/form/articulo/actions'

export default function ClientForm() {
  const [state, formAction, pending] = useActionState(addProductDb, undefined);

  return (
    <div className="contenedor-form ">
      <h1>Agregar producto</h1>
      <form action={formAction}>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="name">
            Producto
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="text"
              id="name"
              name="name"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
          </div>
        </div>

        <div className="form-renglon-per">
          <label className="label-per" htmlFor="description">
            Descripcion
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="description"
              id="description"
              name="description"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.description && <p>{state.errors.description}</p>}
            </div>
          </div>
        </div>

        <div className="form-renglon-per">
          <label className="label-per" htmlFor="price">
            Precio
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="number"
              id="price"
              name="price"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.price && <p>{state.errors.price}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="category">
            Categoria
          </label>
          <div className="form-renglon-per-error">
            <select className="custom-input" name="category" id="category">
            <option value="">--Please choose an option--</option>
              <option value="Sustratos">Sustratos</option>
              <option value="Liquidos">Liquidos</option>
              <option value="Granulados">Granulados</option>
            </select>

           

            <div className="form-renglon-error">
              {state?.errors?.category && <p>{state.errors.category}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="stock">
            Inventario
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="number"
              id="stock"
              name="stock"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.stock && <p>{state.errors.stock}</p>}
            </div>
          </div>
        </div>
     
        
       
        

        <div className="boton-per">
          <button disabled={pending}>
            {pending ? "enviando datos..." : "Guardar producto"}
          </button>
        </div>
      </form>
    </div>
  );
}


/*
 <input
              className="custom-input"
              type="category"
              id="category"
              name="category"
              autoComplete="off"
            />
            */