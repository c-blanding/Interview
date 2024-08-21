import fs from 'fs'
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { PDFDocument, StandardFonts } from 'pdf-lib'
 export async function GET(request: Request) {
   const csv = fs.readFileSync('./data/Documents.csv', 'utf8', )
   const results = Papa.parse(csv, {header: true})
   return NextResponse.json(JSON.stringify(results.data))
 }

 export async function POST(request: Request) {
 
    const data = await request.json();


    console.log(data)
  
    const newData = {
    Name: data.name,
    Category: data.category,
    Path: data.path
    }

   const pdfDoc = await PDFDocument.create()
   const courierFont = await pdfDoc.embedFont(StandardFonts.Courier)
   const page = pdfDoc.addPage()
   page.drawText(data.text)

   const pdfBytes = await pdfDoc.save();


    
   const csv = fs.readFileSync('./data/Documents.csv', 'utf8', )
   const results = Papa.parse(csv, {header: true})
   results.data.push(newData)
   const newCsv = Papa.unparse(results.data)
   fs.writeFileSync(`${data.path}`, pdfBytes)
   fs.writeFileSync('./data/Documents.csv', newCsv, 'utf8')
  
  return NextResponse.json({ message: 'Document Added' });
 }
 
 export async function DELETE(request: Request) {
  const data = await request.json();
  console.log(data.Path)
  fs.unlinkSync(data.Path)
  
  const csv = fs.readFileSync('./data/Documents.csv', 'utf8', )
  const results = Papa.parse(csv, {header: true})
  const newResults = results.data.filter(doc => doc.Path != data.Path)

  const newCsv = Papa.unparse(newResults)
  fs.writeFileSync('./data/Documents.csv', newCsv, 'utf8')


  return NextResponse.json({ message: 'Document Deleted' });
 }


  
    
//  export async function POST(request: Request) {
    
//     }