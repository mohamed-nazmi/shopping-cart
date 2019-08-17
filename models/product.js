const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        // find() method returns a cursor not a promise
        // toArray() gets all MongoDB documents and turns them into a JS array
        // use toArray() for few number of documents
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDb();
        // next() returns the next (and only) document with that prodId
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => console.log('Deleted'))
            .catch(err => console.log(err));
    }
}

module.exports = Product;