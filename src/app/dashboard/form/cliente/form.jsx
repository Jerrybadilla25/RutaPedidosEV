"use client";
import { useActionState, useFormStatus } from "react";
import { addClientBd } from "@/app/dashboard/form/cliente/actions";
import "./local.addcliente.css";

export default function ClientForm({ cliente }) {
  const [state, formAction, pending] = useActionState(addClientBd, undefined);

  return (
    <div className="form-container">
      <div className="mb-1">
        <h1 className="text-h1">Registro de clientes</h1>
        <h3 className="text-h3">Ingrese los datos del nuevo cliente.</h3>
      </div>

      <form action={formAction}>
        {cliente?._id ? (
          <div className="form-row box-line">
            <label htmlFor="name">Numero Cliente</label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              className="input-cliente"
              defaultValue={cliente?.clientId}
              readOnly
            />
            <p className="error-message">
              {state?.errors?.name && state.errors.name}
            </p>
          </div>
        ) : (
          <div className="form-row box-line">
            <label htmlFor="name">Numero Cliente</label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              className="input-cliente"
              defaultValue={cliente?.clientId}
            />
            <p className="error-message">
              {state?.errors?.name && state.errors.name}
            </p>
          </div>
        )}
        <div className="form-row">
          <label htmlFor="name">Nombre del comercio</label>
          <input
            defaultValue={cliente?.name}
            type="text"
            id="name"
            name="name"
            className="input-cliente"
          />
          <p className="error-message">
            {state?.errors?.name && state.errors.name}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-cliente"
            defaultValue={cliente?.email}
          />
          <p className="error-message">
            {state?.errors?.email && state.errors.email}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="contact">Nombre de contacto</label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="input-cliente"
            defaultValue={cliente?.contact}
          />
          <p className="error-message">
            {state?.errors?.contact && state.errors.contact}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="phone">Número de teléfono</label>
          <input
            defaultValue={cliente?.cel}
            type="text"
            id="phone"
            name="cel"
            className="input-cliente"
          />
          <p className="error-message">
            {state?.errors?.cel && state.errors.cel}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="cedJuridica">Cédula Jurídica</label>
          <input
            type="text"
            id="cedJuridica"
            name="cedJuridica"
            className="input-cliente"
            defaultValue={cliente?.cedJuridica}
          />
          <p className="error-message">
            {state?.errors?.cedJuridica && state.errors.cedJuridica}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="provincia">Provincia</label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            className="input-cliente"
            defaultValue={cliente?.address.provincia}
          />
          <p className="error-message">
            {state?.errors?.provincia && state.errors.provincia}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="canton">Cantón</label>
          <input
            type="text"
            id="canton"
            name="canton"
            className="input-cliente"
            defaultValue={cliente?.address.canton}
          />
          <p className="error-message">
            {state?.errors?.canton && state.errors.canton}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="distrito">Distrito</label>
          <input
            type="text"
            id="distrito"
            name="distrito"
            className="input-cliente"
            defaultValue={cliente?.address.distrito}
          />
          <p className="error-message">
            {state?.errors?.distrito && state.errors.distrito}
          </p>
        </div>

        <div className="form-row">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="input-cliente"
            defaultValue={cliente?.address.direccion}
          />
          <p className="error-message">
            {state?.errors?.direccion && state.errors.direccion}
          </p>
        </div>

        <div className="form-button mb-8">
          {cliente?._id ? (
            <button disabled={pending}>
              {pending ? "Enviando datos..." : "Actualizar cliente"}
            </button>
          ) : (
            <button disabled={pending}>
              {pending ? "Enviando datos..." : "Guardar cliente"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/*

<div className="contenedor-form ">
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
    */
