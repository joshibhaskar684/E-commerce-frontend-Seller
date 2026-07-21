"use client"
import { Bot } from "lucide-react";
import AiModal from "../Modal/AiModal";
import { useState } from "react";

export default function AiBot(){
    const [ openModal,setOpenModal]=useState(false);

    return(
        <>
        <button 
            onClick={()=>setOpenModal(true)} 
            className="cursor-pointer fixed bottom-6 right-6 w-14 h-14 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all hover:-translate-y-1 z-[1000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Open AI Assistant"
        >
          <Bot className="w-7 h-7" />
        </button>

        <AiModal openModal={openModal} setOpenModal={setOpenModal} />
        </>
    )
}