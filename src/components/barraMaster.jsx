"use client";
import { changeRoll } from "@/components/actions/actions";
import React,{ useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function BarraMaster({ users }) {
  const [state, formAction, pending] = useActionState(changeRoll, undefined);

  
  // Monitorear cambios en el estado y mostrar un toast según la respuesta
  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "¡Rol actualizado con éxito!");
      } else {
        toast.error(state.message || "Hubo un error al actualizar el rol.");
      }
    }
  }, [state]); // Ejecuta cada vez que `state` cambia

  return (
    <div className="container-90">
      <div className="edit-roles">
        <form action={formAction} className="form-role">
          <h1 className="nameTitle">Cambiar roles</h1>
          {/* Campo para seleccionar al usuario */}
          <label className="label-role" htmlFor="userId">
            Usuario:
          </label>
          <select className="select-role" name="userId" id="userId" required>
            {users.map((user) => (
              <option className="option-role" key={user._id} value={user._id}>
                {user.email} ({user.role})
              </option>
            ))}
          </select>

          {/* Campo para seleccionar el nuevo rol */}
          <label className="label-role" htmlFor="role">
            Nuevo Rol:
          </label>
          <select className="select-role" name="role" id="role" required>
            <option className="option-role" value="master">
              Master
            </option>
            <option className="option-role" value="ventas">
              Ventas
            </option>
            <option className="option-role" value="logistica">
              Logística
            </option>
            <option className="option-role" value="facturacion">
              Facturación
            </option>
            <option className="option-role" value="user">
              Usuario
            </option>
          </select>

          {/* Botón para enviar el formulario */}
          <button type="submit" className="button-role"  disabled={pending}>
          {pending ? "Actualizando..." : "Actualizar Rol"}
          </button>
        </form>
      </div>
    </div>
  );
}
