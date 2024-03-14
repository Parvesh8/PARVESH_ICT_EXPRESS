const express = require("express");
const morgan = require("morgan");
const app = new express();
app.use(morgan('dev'));
app.use(express.json());

// in momoery storage for task
 let tasks = [];
 // route to get all tasks
 app.get("/",(req,res)=>{
    res.json(tasks);
 })

 // route to create a new task
 app.post('/tasks',(req,res)=>{
    const task = req.body
    tasks.push(task);
    res.send({message:"Task Added",task})
 })
 //route to get a task by id
  app.get('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const task =tasks.find(task=>task.id===id)
    if(!task){
        res.send("Task not found");
    }else{
        res.json(task)
    }
  })
  // update
  app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask= req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index==-1){
      res.send("Task not found")
    }else{
      tasks.splice(index,1,updatedTask);
      //task[index] = updatedTask
     res.json(tasks)
    }

  })
   app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id
    const index = tasks.findIndex((task)=>task.id === id )
    if(index === -1){
      res.send("specified element is not presented")
    }else{
      tasks.splice(index, 1);
      res.send('specified item is Deleted')
      console.log('deleted')
    }
   })

 app.listen(5000,(req,res)=>{
    console.log("server activated")
})