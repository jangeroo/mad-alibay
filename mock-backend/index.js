const assert = require('assert');

function genUID() {
    return Math.floor(Math.random() * 100000000)
}

let itemsBought = {} // global variable that keeps track of all the items a user has bought
let itemsSold = {}
let itemListings = {}


/*
initializeUserIfNeeded adds the UID to our global state unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeUserIfNeeded(uid) {
    // If the user is not in our global itemsBought variable, add him
    if(!(uid in itemsBought)) itemsBought[uid] = [];
    // If the user is not in our global itemsSold variable, add him
    if (!(uid in itemsSold)) itemsSold[uid] = [];
}

/* 
createListing adds a new listing to our global state.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: the ID of the new listing
*/
function createListing(sellerID, price, blurb) {
    let listingID = genUID()
    itemListings[listingID] = {
        sellerID,
        price,
        blurb,
        forSale: true,
    }
    return listingID
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: an object that contains the price and the blurb
*/
function getItemDescription(listingID) {
    // console.log('getItemDescription for item', listingID + ':', itemListings[listingID], '\n')
    return {
        price: itemListings[listingID].price,
        blurb: itemListings[listingID].blurb,
    }
}

export *
/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
function buy(buyerID, sellerID, listingID) {
    // console.log('seller', sellerID, 'is selling', listingID);
    // console.log('buyer', buyerID, 'is selling', listingID);
    itemsBought[buyerID].push(listingID)
    itemsSold[sellerID].push(listingID)
    itemListings[listingID].forSale = false
    // console.log('ITEM JUST SOLD:', itemListings[listingID]);
    
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    return itemsSold[sellerID]
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    return itemsBought[buyerID]
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    let items = Object.keys(itemListings)
    return items.filter(
        listingID => itemListings[listingID].forSale == true
    )
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    return allListings().filter(
        listingID => itemListings[listingID].blurb.includes(searchTerm)
    )
}

module.exports={
    genUID,
    initializeUserIfNeeded,
    createListing,
    getItemDescription,
    buy,
    allItemsSold
    allItemsBought,
    allListings,
    searchForListings
}
// // The tests
// let sellerID = genUID();
// let buyerID = genUID();
// initializeUserIfNeeded(sellerID);
// initializeUserIfNeeded(buyerID);
// // console.log('BOUGHT:', itemsBought)
// // console.log('SOLD:', itemsSold)

// let listing1ID = createListing(sellerID, 500000, "A very nice boat");
// let listing2ID = createListing(sellerID, 1000, "Faux fur gloves");
// let listing3ID = createListing(sellerID, 100, "Running shoes");
// // console.log('itemListings:', itemListings,'\n');
// let product2Description = getItemDescription(listing2ID);
// // console.log("product2Description ", product2Description);

// buy(buyerID, sellerID, listing2ID);
// buy(buyerID, sellerID, listing3ID);

// let allSold = allItemsSold(sellerID);
// //  console.log("allSold ", allSold);
// let soldDescriptions = allSold.map(getItemDescription);
// //  console.log("soldDescriptions ", soldDescriptions);

// let allBought = allItemsBought(buyerID);
// //  console.log("allBought ", allBought);
// let allBoughtDescriptions = allBought.map(getItemDescription)
// //  console.log("allBoughtDescriptions ", allBoughtDescriptions);

// let listings = allListings();
// //  console.log("listings ", listings);
// let boatListings = searchForListings("boat");
// let shoeListings = searchForListings("shoes");

// let boatDescription = getItemDescription(listings[0])
// let boatBlurb = boatDescription.blurb;
// let boatPrice = boatDescription.price;

// assert(allSold.length == 2); // The seller has sold 2 items
// assert(allBought.length == 2); // The buyer has bought 2 items
// assert(listings.length == 1); // Only the boat is still on sale
// assert(boatListings.length == 1); // The boat hasn't been sold yet
// assert(shoeListings.length == 0); // The shoes have been sold
// assert(boatBlurb == "A very nice boat");
// assert(boatPrice == 500000);

// console.log('ALL TESTS PASSED');
