import React from "react";
import User from "@/model/User";

export default async function BarraMaster() {
  let users = await User.find().select("-password -fecha").lean();
  users = JSON.parse(JSON.stringify(users));
  return (
    <div className="container-90">
      <div className="edit-roles">
        <form className="form-role">
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
          <button className="button-role" >
            Actualizar Rol
          </button>
        </form>
      </div>
    </div>
  );
}
