import React, { Component } from 'react';
import backend from './backend/firebase-backend.js'

class TestDataGenerator extends Component {
    constructor() {
        super();
        console.log('Generating test data...');
        this.generateData()

    }
    async generateData() {
        backend.database.ref('/').set(null)

        // SET UP SOME LISTINGS FOR DIFFERENT VENDORS
        let items = [
            { sellerID: 'seller_123', price: 15, blurb: 'Green polo shirt' },
            { sellerID: 'seller_123', price: 135, blurb: 'Blue Tux' },
            { sellerID: 'seller_123', price: 76, blurb: 'AlbertoTime Jeans' },
            { sellerID: 'seller_345', price: 49.99, blurb: 'Ergonomic wireless gaming mouse' },
            { sellerID: 'seller_345', price: 79.99, blurb: 'Ergonomic wireless gaming keyboard' },
            { sellerID: 'seller_345', price: 89.99, blurb: 'Samsung 1TB Hard drive' },
            { sellerID: 'seller_567', price: 3.99, blurb: 'Long stem rose' },
            { sellerID: 'seller_567', price: 29.99, blurb: '1 dozen long stem roses' }
        ];

        async function createListing(item) {
            // console.log('creating listing for:', item);
            return await backend.createListing(
                item['sellerID'], item['price'], item['blurb']
            )
        }
        let itemListings = await Promise.all(items.map(createListing))
        console.log('all items created')
        console.log(itemListings)
        // MAKE SOME PURCHASES
        backend.buy('buyer_111', itemListings[2])
        backend.buy('buyer_111', itemListings[6])
        backend.buy('buyer_222', itemListings[1])
        backend.buy('buyer_333', itemListings[4])
    }

    render() {
        return (<div></div>);
    }
}

export default TestDataGenerator;