"use server";

import User from "@/model/User";
import { connectDB } from "@/utils/dbserver";
import bcrypt from "bcryptjs";
import { createSession } from "@/utils/session";
//import { cookies } from 'next/headers'
import { deleteSession } from "@/utils/session";
import { SignupFormSchema } from "@/utils/definiciones";
//import Roles from '@/model/Roles'

export async function signup(state, formData){
  //1 validar los datos
  const validatedFields = SignupFormSchema.safeParse({
    user: formData.get('user'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  connectDB()
  const {user, email, password}=validatedFields.data
  const userEmail = await User.find({email: email})
  //const rol = await Roles.find({rol:"master"})
  if(userEmail.length===1){
    console.log('el correo ya exixte')
  }else{
  // Encriptar la contraseña
   const hashedPassword = await bcrypt.hash(password, 10)
  // Crear el usuario en la base de datos con la contraseña encriptada
   const createUser = new User({
    user,
    email,
    password: hashedPassword,
  });
  //createUser.roles.push(rol[0]._id)
  await createUser.save();
  //console.log(createUser)
  }
    
};


//monitor25*


export async function validateUser(emailUser, passwordUser) {
  try {
    
    if (!emailUser && !passwordUser) {
      return {
        message: "campos en blanco",
      };
    }
    const UserId = await User.find({ email: emailUser });
    if (UserId.length === 0) {
      return {
        message: "Email invalido",
      };
    }
    let hashedPaswword = UserId[0].password;
    const dataUser = await bcrypt.compare(passwordUser, hashedPaswword);
    if (dataUser) {
      const user = { _id: UserId[0]._id.toHexString() };
      const sessionCreate = await createSession(user._id);
      const tokenId = { token: sessionCreate };
      return tokenId;
    } else {
      return {
        message: "Su contraseña no coincide",
      };
    }
  } catch (err) {
    console.error("Error al verificar la contraseña:", err);
    return {
      message: "An error occurred while creating your account.",
    };
  }
}

/*
  try {
      const emailUser = formData.get("email");
      const passwordUser = formData.get("password");
      const getToken = await validateUser(emailUser, passwordUser);
      if (getToken.token) {
        console.log("el token exixte");
        //redirect('/dashboard')
      } else {
        console.log("el token no exixte");
      }
    } catch (error) {
      console.log(error);
    }
      */
