import React, {useState} from 'react'

function ListingForm({onAddItem}) {
    const [formData, setFormData] = useState({description: "", image: "", location: ""})

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name] :value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:6001/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(formData),
        })
        .then((r) => r.json())
        .then((newItem) => onAddItem(newItem))
        setFormData({description: "", image: "", location: ""})
    }


  return (
    <form onSubmit={handleSubmit}>
        <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Enter description'/>
        </label>
        <label>
            Image:
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder='Enter Image URL'/>
        </label>
        <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder='Enter Location' />
        </label>
        <button type="submit">Submit</button>

    </form>
  )
}

export default ListingForm