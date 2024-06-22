import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <a className="md:fixed max-w-[250px] flex items-center gap-2 bottom-2 left-8 border py-1 px-3 rounded-md shadow border-purple-300 cursor-pointer mx-auto mb-4 md:mb-1 backdrop-blur" href="/about">Made with ❤️ <Image alt="NEXT.JS" loading="lazy" width={69} height={14} decoding="async" style={{ color: "transparent" }} src="/next14.svg" /></a>
  )
}

export default Footer
