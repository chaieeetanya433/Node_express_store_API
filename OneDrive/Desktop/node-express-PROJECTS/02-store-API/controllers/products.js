//if in any of the controllers if we throw an error we will be actually able to access that error from our custom error-handler
const { Query } = require('mongoose');
const products = require('../models/products');
const Product = require('../models/products');

const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async error')
    // const products = await Product.find({})     //if we want to get the whole document
    // const products = await Product.find({ feature: false })     //if we want to get the specific info from the whole document
    // const products = await Product.find({
    //     page: '2',
    // })
    //to search a name of specific alphabet
    // const search = 'w'
    // const products = await Product.find({
    //     name: { $regex: search, $options: 'i' },
    // }) 

    //to sort in ascending order
    // const products = await Product.find({}).sort('name')

    //to sort in descending order
    // const products = await Product.find({}).sort('-name -price')

    // res.status(200).json({msg:'products testing route'})
    const products = await Product.find({price: { $gt: 30 }}) 
        .sort('name')
        .select('name price')
        // .limit(10)
        // .skip(5)
    res.status(200).json({ products, nHbits: products.length })  //we're passing an empty object
}

const getAllProducts = async (req,res)=>{
    // res.status(200).json({msg:'products route'})
    const { feature,company,name,sort,fields,numericFilters } = req.query
    const queryObject = {}

    if(feature) {
        queryObject.feature = feature === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company 
    }
    if(name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if(numericFilters) {
        const operatorMap = {
            '>':'$gt', 
            '>=':'$gte', 
            '=':'$eq', 
            '<':'$lt', 
            '<=':'$lte', 
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match)=>`-${operatorMap[match]}-`
        )
        // console.log(numericFilters)
        // console.log(filters)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    console.log(queryObject)
    let result = Product.find(queryObject)
    if(sort) {
        // products = products.sort()
        // console.log(sort)
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } 
    //if the user doesn't pass the sort key then by default we'll sort the items based on the time when those items were created
    else {
        result = result.sort('createdAt')
    }

    //if we want to display some particular mentioned fields only then
    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    // const page = Number(req.query.page) || 1: This line extracts the page parameter from the request query string and converts it to a number using Number(). If the page parameter is not present or cannot be converted to a number, it defaults to 1.

    const limit = Number(req.query.limit) || 10
    // const limit = Number(req.query.limit) || 10: This line extracts the limit parameter from the request query string and converts it to a number using Number(). If the limit parameter is not present or cannot be converted to a number, it defaults to 10.
    
    const skip = (page -1) * limit;
    // const skip = (page - 1) * limit;: This line calculates the number of documents to skip in the query result based on the page and limit values. For example, if page is 1 and limit is 10, skip will be 0. If page is 2, skip will be 10 (skipping the first 10 documents), and so on.
    
    result = result.skip(skip).limit(limit)
    // result = result.skip(skip).limit(limit): This line applies the pagination to the result by skipping the specified number of documents (skip) and limiting the number of documents returned to the specified limit. It's assumed that result is a query or a database cursor.

    const products = await result
    res.status(200).json({products, nHbits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}