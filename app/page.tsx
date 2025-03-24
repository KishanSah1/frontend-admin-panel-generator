import React from 'react'
import { redirect } from 'next/navigation';

const page = () => {
  redirect("/login"); 
  return null;
}

export default page
