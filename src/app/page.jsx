import React from 'react'
//import Home from '@/components/home'
import {connectDB} from '@/utils/dbserver'


export default function Homepage() {
  connectDB()
  return (
    <div className="grid grid-rows">
      <div>homepage</div>
      
    </div>
  );
}