import React from 'react'
import { FaGithub, FaInstagram } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className=' mt-4 max-w-5xl w-full mx-auto p-8 rounded-full bg-[#121212] |absolute bottom-0| flex flex-col items-center' >
      <div className='flex gap-4'>
        <p>Visita le mie pagine</p>
        <a href="https://github.com/Dexy98"><FaGithub/></a>
        <a href="https://www.instagram.com/_davide_1998/"><FaInstagram/></a>
      </div>
      <br />
      <div>
        <h4>2023 by Dexy98</h4>
      </div>
    </div>
  )
}

export default Footer
