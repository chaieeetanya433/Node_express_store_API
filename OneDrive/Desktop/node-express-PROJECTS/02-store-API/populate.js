require('dotenv').config()  //The config method allows your application to get or set values in all files that are in the config directory.

const connectDB = require('./db/connect');
const Product = require('./models/products');

const jsonProducts = require('./products.json')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('Success!!!')
        // If your Node. js process is not terminated properly, you can use the exit() function to terminate it forcefully.
        process.exit(0)
    } catch(error) {
        console.log(error)        
        process.exit(1)
    }
} 

start()

