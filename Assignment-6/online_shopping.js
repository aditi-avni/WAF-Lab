
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function main() {
    await client.connect();
    console.log('MongoDB connected');

    const db = client.db('ShoppingDB');
    const products = db.collection('products');

    await products.deleteMany({});

    await products.insertMany([
        { productId: 'P101', productName: 'Laptop', category: 'Electronics', price: 50000, stock: 15 },
        { productId: 'P102', productName: 'Headphones', category: 'Electronics', price: 2000, stock: 8 },
        { productId: 'P103', productName: 'Keyboard', category: 'Accessories', price: 1500, stock: 20 },
        { productId: 'P104', productName: 'Mouse', category: 'Accessories', price: 800, stock: 12 }
    ]);
    console.log('Four products inserted');

    const result = await products.find({ stock: { $gt: 10 } }).toArray();
    console.log('Products with stock greater than 10:', result);

    await products.updateOne(
        { productId: 'P102' },
        { $set: { price: 1800 } }
    );
    console.log('P102 price updated');

    await products.deleteOne({ productId: 'P103' });
    console.log('P103 deleted');

    const finalProducts = await products.find().toArray();
    console.log('Remaining products:', finalProducts);

    await client.close();
}

main().catch(console.error);
