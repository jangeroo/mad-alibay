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
            { sellerID: 'seller_123', price: 15, image:"https://ph-live-03.slatic.net/p/7/lifeline-polo-shirt-emerald-green-1465891751-6960964-1945f5f8d7e85141baa59d563b832ca9.jpg", blurb: 'Green polo shirt' },
            { sellerID: 'seller_123', price: 135, image:"https://d205mlr7mt0s9q.cloudfront.net/media/catalog/product/cache/1/thumbnail/760x570/9face7a9b5b044e3059ee6f742f39f36/8/9/x895_tux_full_ao1-1.jpg.pagespeed.ic.NooWS6a7pt.jpg", blurb: 'Blue Tux' },
            { sellerID: 'seller_123', price: 76, image:"http://www.ngdeal.com/wp-content/uploads/2017/08/291357_main.jpg", blurb: 'AlbertoTime Jeans' },
            { sellerID: 'seller_345', price: 49.99, image:"https://www.bakkerelkhuizen.com/uploads/product/big/handshoemouse-wireless-wireless-ergonomic-mouse-1469102634.jpg", blurb: 'Ergonomic wireless gaming mouse' },
            { sellerID: 'seller_345', price: 79.99, image:"http://www.fentek-ind.com/images/KBERFTBALL.jpg", blurb: 'Ergonomic wireless gaming keyboard' },
            { sellerID: 'seller_345', price: 89.99, image:"http://images.overclock.co.uk/product_images/large/HX-MT010EA_G22.jpg", blurb: 'Samsung 1TB Hard drive' },
            { sellerID: 'seller_567', price: 3.99, image:"https://img.grouponcdn.com/deal/2SvKkHCFxzn2uD3TcBRCLxQgjk6X/2S-2048x1229/v1/c700x420.jpg", blurb: 'Long stem rose' },
            { sellerID: 'seller_567', price: 29.99, image:"https://www.gifttree.com/images/super/7738a_dozen-pink-roses-and-lace.jpg", blurb: '1 dozen long stem roses' }
        ];

        async function createListing(item) {
            // console.log('creating listing for:', item);
            return await backend.createListing(
                item['sellerID'], item['price'], item['image'], item['blurb']
            )
        }
        let itemListings = await Promise.all(items.map(createListing))
        console.log('all items created')
        console.log(itemListings)
        // MAKE SOME PURCHASES
        backend.buy('buyer_111', itemListings[2])
        backend.buy('buyer_111', itemListings[6])
        backend.buy('buyer_222', itemListings[1])
    }

    render() {
        return (<div></div>);
    }
}

export default TestDataGenerator;