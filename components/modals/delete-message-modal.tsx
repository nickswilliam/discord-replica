"use client";

import axios from "axios";
import qs from 'query-string'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

import { useState } from "react";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  
  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;
  const [isLoading, setIsLoading] = useState(false);


  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })

      await axios.delete(url)
      onClose();

    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Eliminar Mensaje
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            ¿Estás seguro que querés eliminar el mensaje? <br/>
            El mensaje será eliminado permanentemente.        
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant='ghost'>
              Cancelar
            </Button>

            <Button disabled={isLoading} variant='primary' onClick={onClick} >
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
