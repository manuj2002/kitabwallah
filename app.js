const  bodyparser= require('body-parser');
const express=require('express');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

const dbcontroller=require('./dbcontroller.js')


app.get('/',(req,res)=>{
   
   dbcontroller.check();
    res.render('homepage');
})
app.get('/addbook',(req,res)=>{
    res.render('addbook');
})
 app.post('/addbook',(req,res)=>{
    const newadd = { name: req.body.name,genre:req.body.genre,status:'available',quantity:req.body.quantity,description:req.body.description,author:req.body.author,imagelink:req.body.imagelink };
   dbcontroller.createdoc(newadd);
    dbcontroller.check();
   
  
 })
app.post('/searchgenre',(req,res)=>{
  async function helper()
  {
    results= await dbcontroller.search({genre:req.body.genre});
    console.log(results);
    res.render('showbook',{results:results})
    
  }
  helper();
})
app.post('/bookdetail',(req,res)=>{
  async function helper()
  {
    object_id= await dbcontroller.findbyid(req.body.id);
    console.log( object_id);
    res.render('showdetail',{res:object_id})
  }
  helper();

})

app.listen(300,()=>{
    console.log('server started at '+300);
})