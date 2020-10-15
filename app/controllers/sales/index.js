const {Sale} = require('../../models')
const axios = require('axios');

const all = async () =>{

  try{
    const sales = await Sale.find({});
    return sales
  }
  catch(err){
    console.log("Error: ", err)
  }
};

const findById = async (id) =>{
  try{
    const sale = await Sale.findOne({_id: id})
    return sale
  }
  catch(err){
    console.log("Error: ", err)
  }
}

const remove = async (id) =>{
  try{
    const sale = await Sale.deleteOne({_id: id})
    return sale
  }
  catch(err){
    console.log("Error: ", err)
  }
}

const update = async (id, body) =>{
  try{
    const sale = await Sale.update({_id: id}, body)
    return sale;
  }
  catch(err){
    console.log("Error: ", err)
  }
}

const create = async (body) => {
  try{
    console.log(body)
    let sum = 0;
    for(var i=0; i<body.items.length;i++)
    {
        sum = sum + Number(body.items[i].productPrice)
    }
  
    let data={
      customerId: body.customerId,
      items: body.items,
      total: sum
    }

    return Sale.create(data)
  }
  catch(err){
    console.log("Error: ", err)
  }
};


module.exports = {
  all,
  create,
  findById,
  update,
  remove
};