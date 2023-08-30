const mongoose = require('mongoose');
const { ConnectionCheckedInEvent } = require('mongoose/node_modules/mongodb');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/books');
  console.log('connected');
  
}
main();

const bookschema= new mongoose.Schema({
    name:String,
    genre:String,
    status:String,
    quantity:Number,
   description:String,
    author:String,
    imagelink:String
    
});
const Book=mongoose.model('Book',bookschema);

module.exports.createdoc=async function createdoc(newadd)
{
    newdata=new Book(newadd)
    await Book.create(newdata);
}
module.exports.check=async function check()
{
    const x=await Book.find({});
    console.log(x);
  
}
module.exports.search=async function search(tofind)
{
    const finalfind=await Book.find(tofind);
    return(finalfind);
}
module.exports.remove=async function remove(todelete)
{
    
    await Book.deleteMany(todelete);
    

}
module.exports.findbyid=async function(id)
{
   const finalobject=await Book.findById(id);
    return(finalobject);
}