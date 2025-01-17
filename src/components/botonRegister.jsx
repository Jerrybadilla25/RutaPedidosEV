"use client";
import React from "react";
import Link from "next/link";
//import { GrLogout } from "react-icons/gr";

export default function BotonRegister() {
  return (
    <Link href="/register" className="btn-out">
      <p>Register</p>
    </Link>
  );
}
