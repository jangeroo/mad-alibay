import React, { Component } from 'react';



class CreateItem extends Component {

    render() {
        return (
            <div className="CreateItem">
                <form>
                    <div>
                    <input placeholder="Blurb" />
                    <input placeholder="Price" />
                    </div>
                    <button className="btn">Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem;