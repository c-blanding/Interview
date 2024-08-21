'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import doc from 'pdfkit'
import DialogButtonGroup from './DialogButtonGroup'
import { Button } from './ui/button'
import { TableRow, TableCell } from './ui/table'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {Spinner} from "@nextui-org/spinner";

const DocTableSlot = ({doc, index, onDocDelete}) => {
    let count = 0
    const router = useRouter()
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    useEffect(() => {
        getText()
    }, [text])

    const getText = async ()=> {
        setLoading(true)
        const text = await getPDfText(doc)
        setText(text)
        setLoading(false)
    }

  return (
    <TableRow key={index} >
    <TableCell>{doc.Name}</TableCell>
    <TableCell>{doc.Path}</TableCell>
    <TableCell>{doc.Category}</TableCell>
    <TableCell className="text-right">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button onClick={() => {getText()}}>View</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2'>View Your Document below</DialogTitle>
          <DialogDescription className='flex flex-col justify-center items-center'>
            <p className='w-[95%] h-96 bg-gray-100'>
              {loading ?  'Loading...' : text}
            </p>
            <Dialog>
              <DialogTrigger asChild><Button variant={"destructive"} >Delete</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription className='flex flex-col'>
                    Are you sure you want to delete this document? This action cannot be undone.    
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogButtonGroup index={index} doc={doc} open={open} onOpenChange={setOpen} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </TableCell>
  </TableRow>
  )
}

export default DocTableSlot

export async function getPDfText(docs: DocumentType): Promise<string> {
  try {
    const response = await fetch(`http://localhost:3000/api/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docs),
    });

    const data = await response.json();;
    return data.text;
  } catch (error) {
    console.error('there was an error');
    return getPDfText(docs)
  }
}
    