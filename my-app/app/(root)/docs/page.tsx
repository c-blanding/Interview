import DocsComponent from '@/components/DocsComponent'
import Papa from 'papaparse'
import fs from 'fs'



const DocsPage = () => {

 var data = getCSV()

 const refreshData = () => {
   data = getCSV()
 }

 
  
  return (
    <div>
        <DocsComponent csv={data} />
            
    </div>
  )
}

export default DocsPage

export function getCSV() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  
  const csv = fs.readFileSync('./data/Documents.csv', 'utf8', )
  const results = Papa.parse(csv, {header: true})
  return JSON.stringify(results.data)
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  
}