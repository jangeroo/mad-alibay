const assert = require('assert');

var admin = require("firebase-admin");
var serviceAccount = require("./mad-alibay-firebase-adminsdk-ji3mp-a797a61448.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mad-alibay.firebaseio.com"
});
let database = admin.database();
let db = database

let itemsBought = db.ref('/itemsBought')
let itemsSold = db.ref('/itemsSold')
let itemListings = db.ref('/itemListings')
/*
Before implementing the login functionality, use this function to generate a new UID every time.
It will decrease your iteration time.
*/
function genUID() {
  return Math.floor(Math.random() * 100000000)
}


/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: A promise
*/
function initializeUserIfNeeded(uid) {
}

/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: A promise containing the ID of the new listing
*/
function createListing(sellerID, price, blurb) {
  let listingID = `item_${genUID()}`
  let item = {
    sellerID,
    price,
    blurb,
    forSale: true,
  }
  return itemListings.child(listingID).set(item)
    .then(() => listingID)
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: A promise that contains an object containing the price and blurb properties.
*/
function getItemDescription(listingID) {
  return itemListings.child(listingID).once('value')
    .then(item => {
      return {
        price: item.val().price,
        blurb: item.val().blurb,
      }
    })
    .catch(error => {
      console.log(error, 'in getItemDescription()')
    })
}

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
    returns: a promise
*/
function buy(buyerID, sellerID, listingID) {
  return Promise.all([
    itemsBought.child(buyerID).child(listingID).set(true),
    itemsSold.child(sellerID).child(listingID).set(true),
    itemListings.child(listingID).child('forSale').set(false)
  ])
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: a promise containing an array of listing IDs
*/
function allItemsSold(sellerID) {
  return itemsSold.child(sellerID).once('value')
    .then(data => data.val())
    .then(items => Object.keys(items))
    .catch(err => [])
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: a promise containing an array of listing IDs
*/
function allItemsBought(buyerID) {
  return itemsBought.child(buyerID).once('value')
    .then(data => data.val())
    .then(items => Object.keys(items))
    .catch(err => [])
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: a promise containing an array of listing IDs
*/
function allListings() {
  return itemListings.once('value')
    .then(data => data.val())
    .then(itemListings => {
      let items = Object.keys(itemListings)
      return items.filter(
        listingID => itemListings[listingID].forSale == true
      )
    })
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: a promise containing an array of listing IDs
*/
async function searchForListings(searchTerm) {
  items = await itemListings.once('value')
    .then(data => data.val())
  
  return allListings()
    .then(listingIDs => listingIDs.filter(
      listingID => items[listingID].blurb.includes(searchTerm)
    ))
}

// The tests
async function test() {
  await database.ref('/').set(null);
  let sellerID = genUID();
  let buyerID = genUID();

  await initializeUserIfNeeded(sellerID)
  await initializeUserIfNeeded(buyerID)

  let listing1ID = await createListing(sellerID, 500000, "A very nice boat")
  let listing2ID = await createListing(sellerID, 1000, "Faux fur gloves")
  let listing3ID = await createListing(sellerID, 100, "Running shoes")
  let product2Description = await getItemDescription(listing2ID)

  await buy(buyerID, sellerID, listing2ID)
  await buy(buyerID, sellerID, listing3ID)

  let allSold = await allItemsSold(sellerID)
  let soldDescriptions = await Promise.all(allSold.map(getItemDescription))
  let allBought = await allItemsBought(buyerID)
  let allBoughtDescriptions = await Promise.all(allBought.map(getItemDescription))
  let listings = await allListings()
  let boatListings = await searchForListings("boat")
  let shoeListings = await searchForListings("shoes")
  let boatDescription = await getItemDescription(listings[0])
  let boatBlurb = boatDescription.blurb;
  let boatPrice = boatDescription.price;
  assert(allSold.length == 2); // The seller has sold 2 items
  assert(allBought.length == 2); // The buyer has bought 2 items
  assert(listings.length == 1); // Only the boat is still on sale
  assert(boatListings.length == 1); // The boat hasn't been sold yet
  assert(shoeListings.length == 0); // The shoes have been sold
  assert(boatBlurb == "A very nice boat");
  assert(boatPrice == 500000);
  console.log('ALL TESTS PASSED');
}

test();