"use client";
import { useActionState, useFormStatus } from "react";
import { addClientBd } from "@/app/dashboard/form/cliente/actions";

export default function ClientForm() {
  const [state, formAction, pending] = useActionState(addClientBd, undefined);

  return (
    <div className="contenedor-form">
      <h1>Agregar cliente</h1>
      <form action={formAction}>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="name">
            Nombre del comercio
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
          <label className="label-per" htmlFor="email">
            Correo electrónico
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
          </div>
        </div>

        <div className="form-renglon-per">
          <label className="label-per" htmlFor="contacto">
            Nombre de contacto
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="contact"
              id="contact"
              name="contact"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.contact && <p>{state.errors.contact}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="phone">
            Número de teléfono
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="phone"
              id="phone"
              name="cel"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.cel && <p>{state.errors.cel}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="cedJuridica">
            Cedula Juridica
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="cedJuridica"
              id="cedJuridica"
              name="cedJuridica"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.cedJuridica && <p>{state.errors.cedJuridica}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="provincia">
            Provincia
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="provincia"
              id="provincia"
              name="provincia"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.provincia && <p>{state.errors.provincia}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="canton">
            Canton
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="canton"
              id="canton"
              name="canton"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.canton && <p>{state.errors.canton}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="distrito">
            Distrito
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="distrito"
              id="distrito"
              name="distrito"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.distrito && <p>{state.errors.distrito}</p>}
            </div>
          </div>
        </div>
        <div className="form-renglon-per">
          <label className="label-per" htmlFor="direccion">
            Direccion
          </label>
          <div className="form-renglon-per-error">
            <input
              className="custom-input"
              type="direccion"
              id="direccion"
              name="direccion"
              autoComplete="off"
            />
            <div className="form-renglon-error">
              {state?.errors?.direccion && <p>{state.errors.direccion}</p>}
            </div>
          </div>
        </div>

        <div className="boton-per">
          <button disabled={pending}>
            {pending ? "enviando datos..." : "Guardar cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}

/*
  const handleSubmit = (event) => {
      event.preventDefault(); // Prevenir recarga de página
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log(data); // Aquí puedes enviar los datos a tu backend
    };
    

    
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Crear clientes
        </h1>
        <form  className="space-y-4">
         
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
         
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
         
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
       
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>
      */
