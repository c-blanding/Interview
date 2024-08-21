import fs from 'fs'
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import pdfmake from 'pdfmake'
import pdf from 'pdf-parse'
import PdfParse from 'pdf-parse';
import {PdfReader} from 'pdfreader'
import PDFParser from "pdf2json"; 



export async function GET(request: Request) {
  const data = await request.json();
  const dataBuffer = fs.readFileSync(data.Path)
  return pdf(dataBuffer).then((data) => {
    return NextResponse.json(data.text);
  })
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
  
  
  export async function POST(request: Request) {
    try {
      
      const data = await request.json();
      const dataBuffer = fs.readFileSync(data.Path)
      const pdfData = await pdf(dataBuffer);
      return NextResponse.json({ text: pdfData.text });
    } catch (error) {
      console.error('there was an error');
      return
    }
  
  }