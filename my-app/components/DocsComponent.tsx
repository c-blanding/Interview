"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DocumentType } from '@/types/DocumentType'
import DialogButtonGroup from './DialogButtonGroup'
import AddDocForm from './AddDocForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DocTableSlot from './DocTableSlot'



const DocsComponent = ({ csv }) => {

  const parsed = JSON.parse(csv)
  let docs = parsed.filter(doc => doc.Name != '')


  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)


  function onSubmit(values: any) {

  
  }

  const getText = async (docs: DocumentType) => {
    const text = await getPDfText(docs)
    setText(text)
  }

  const onDeleteDocument = (index: number) => {
    docs.splice(index, 1)
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[70%]'>

        <Table>
          <TableCaption>A list of your Documents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {docs.map((doc: DocumentType, index: number) => {
              return (
                <>
                
                <DocTableSlot doc={doc} index={index} onDocDelete={onDeleteDocument} key={index}/>
                </>
              )
            })}

          </TableBody>
        </Table>
        <div className='flex justify-center items-center'>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Add Document</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='mb-4'>Add a new Document</DialogTitle>
                <DialogDescription>
                 <AddDocForm setOpen={setOpen} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

    </div>


  )
}

export default DocsComponent

export async function getCSV() {
  const res = await fetch('http://localhost:3000/api/')
  const data = await res.text()
  console.log(data)
  return data
}

