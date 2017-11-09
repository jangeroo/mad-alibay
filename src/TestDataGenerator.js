import React, { Component } from 'react';
import backend from './firebase-backend.js'

class TestDataGenerator extends Component {
    constructor() {
        super();
        console.log('Generating test data...');
        // this.generateData()
    }
    generateData() {
        backend.createListing('Mickey Mouse', 12.99, "Mickey ears")
    }

    render() {
        return (<div></div>);
    }
}

export default TestDataGenerator;