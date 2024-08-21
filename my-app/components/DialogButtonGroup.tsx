"use client"
import { DialogClose } from '@/components/ui/dialog'
import React from 'react'
import { Button } from './ui/button'
import fs from 'fs'
import { DocumentType } from '@/types/DocumentType'
import { useRouter } from 'next/navigation'
import { on } from 'events'

const DialogButtonGroup = ({doc, onOpenChange, setDeleted}: { index: number, doc: DocumentType, open: boolean, onOpenChange: Function, onDocDelete: Function, getText: Function, setText: Function, setDeleted: Function}) => {

    const router = useRouter()
   
    console.log(doc)

    async function onDelete() {
       await fetch(`http://localhost:3000/api/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
       })
       onOpenChange(false)
        router.refresh()
    } 

  return (
<div className='flex justify-end gap-2'>
    <DialogClose asChild>
    <Button variant={"destructive"} onClick={() => onDelete()}>Delete</Button>
    </DialogClose>
    <DialogClose asChild>
    <Button>Cancel</Button>
   </DialogClose> 
</div>  
)
}

export default DialogButtonGroup