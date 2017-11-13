import React, { Component } from 'react';

class CreateItem extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <form>
                    <input placeholder="Blurb" />
                    <input placeholder="Price" />
                    <button >Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem;