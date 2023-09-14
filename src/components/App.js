import React, {useState, useEffect} from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";
import ListingForm from "./ListingForm";

function App() {
  const [listings, setListings] = useState([])
  const [displayListings, setDisplayListings] = useState([])
  useEffect(()=> {
    fetch("http://localhost:6001/listings")
    .then(r =>r.json())
    .then (data => {
      setListings(data)
      setDisplayListings(data)
    })
  }, [])

  function deleteListing(listingToBeDeleted) {
    const updatedListings = listings.filter(listing => listing.id !== listingToBeDeleted.id)
    setListings(updatedListings)
    setDisplayListings(updatedListings)
  }

  function filterSearch(term) {
    const listingsToDisplay = listings.filter((listing) => {
      if (term === "" ) return true
      return listing.description.toLowerCase().includes(term.toLowerCase())
    })
    setDisplayListings(listingsToDisplay)
  }

  function addItem(newItem) {
    setListings([...listings, newItem])
    setDisplayListings([...displayListings, newItem])
  }

  return (
    <div className="app">
      <Header onSearch={filterSearch}/>
      <ListingForm onAddItem={addItem}/>
      <ListingsContainer listings={displayListings} onDelete={deleteListing}/>
    </div>
  );
}

export default App;
