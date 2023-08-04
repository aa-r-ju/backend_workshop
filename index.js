const express = require("express")
const app = express()
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
app.get('/', (request,response) => {
    response.send("<h1> Hello world </h1>")
})  
app.get('/api/notes', (request,response) => {
    response.json(notes )
})  
app.get("/api/notes/:id", (request,response) => {
    const myId = Number(request.params.id)
    const idName = notes.find(note => note.id === myId)
    response.send(idName)

})

const PORT = 3002
app.listen(PORT) 
console.log(`Server running on port ${PORT}`)


