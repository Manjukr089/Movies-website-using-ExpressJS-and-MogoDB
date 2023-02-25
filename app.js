const express = require('express')
const app = express()
const PORT = 3000
const movie = require('./model/movies')


//!mongoose
const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId;


// _id: new mongoose.Types.ObjectId()
mongoose.set('strictQuery', false);
const { findById } = require('./model/movies')

//! setting up the view engine
app.set('view engine','ejs')
//! body parser
app.use(express.urlencoded()) // extended:true nested objects

//!database connection
const dbURL = 'mongodb://localhost:27017/Movies'
mongoose.connect(dbURL).then(()=>{
    console.log("Connected to database");
})


app.get('/',async(req,res)=>{
    let movies = await movie.find()
    res.render('home',{movies})
})
app.get('/addMovie',(req,res)=>{
    res.render('addMovie')
})
// app.get('/:id',async(req,res)=>{
//     let movies =await movie.findById(req.params.id)
//     res.render('view',{movies})
// })


app.get('/:id', async (req, res) => {
    try {
      const movies = await movie.findById(req.params.id)
      res.render('view', { movies })
    } catch (e) {
      console.log(e)
      res.status(404).send('Movie not found')
    }
  })
  



app.post('/',async(req,res)=>{
    //! adding data to the model
    let movieData = new movie({
      
        title:req.body.title,
        rating:req.body.rating,
        description:req.body.description,
        video:req.body.video
    })
    try{
       await movieData.save()
       res.redirect('/')
    }
    catch(e)
    {
        res.render('/addMovie')
    }
})
app.listen(PORT,()=>{
    console.log(`Listening to port at ${PORT}`);
})