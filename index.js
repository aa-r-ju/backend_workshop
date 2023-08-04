const express = require("express")
const app = express()
app.use(express.json())


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


  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }


  app.use(requestLogger) 

app.get('/', (request,response) => {
    response.send("<h1> Hello world </h1>")
})  
app.get('/api/notes', (request,response) => {
    response.json(notes )
})  
app.get("/api/notes/:id", (request,response) => {
    const myId = Number(request.params.id)
    const idName = notes.find(note => note.id === myId)
    if(idName) {
        response.send(idName)
    } else {
        response.status(404).send("not found")
    }

})
app.delete('/api/notes/:id', (request,response) => {
    const myId1 = Number(request.params.id)
    const idName = notes.filter(note => note.id !== myId1)
    response.send(idName)
}) 

app.post('/api/notes', (request, response) => {
  const note = request.body
  if(note.content === " ") {
    response.send("content is missing")
  } else {
  note.id = notes.length + 1
  response.json(note)
  notes.concat(note)
  }
})

app.put('/api/notes/:id', (request,response) => {
  const myId4 = Number(request.params.id)
  const idName4 = notes.find(note => note.id === myId4)
  idName4.important = request.body.important
  response.send(idName4)
  })  


const PORT = 3002
app.listen(PORT) 
console.log(`Server running on port ${PORT}`)


