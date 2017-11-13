import React, { Component } from 'react';


class CreateItem extends Component {

    render() {
        return (
            <div className="CreateList">
                <form>
                    <input placeholder="Blurb" className=""/>
                    <input placeholder="Price" />

                    <button className="btn">Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem;