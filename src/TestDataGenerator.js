import React, { Component } from 'react';
import backend from './firebase-backend.js'

class TestDataGenerator extends Component {
    constructor() {
        super();
        console.log('Generating test data...');
        // this.generateData()
    }
    generateData() {
        // SET UP SOME LISTINGS FOR DIFFERENT VENDORS
        backend.createListing(123,15,'Green polo shirt')
        backend.createListing(123,135, 'Blue Tux')
        backend.createListing(123,76, 'AlbertoTime Jeans')

        backend.createListing(345,49.99, 'Ergonomic wireless gaming mouse')
        backend.createListing(345,79.99, 'Ergonomic wireless gaming keyboard')
        backend.createListing(345, 'Samsung 1TB Hard drive')

        backend.createListing(567,3.99, 'Long stem rose')
        backend.createListing(567,29.99, '1 dozen long stem roses')

        // MAKE SOME PURCHASES
        backend.buy()
    }

    render() {
        return (<div></div>);
    }
}

export default TestDataGenerator;