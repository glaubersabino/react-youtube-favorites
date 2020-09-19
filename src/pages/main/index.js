import React from 'react'

import './styles.css'

import Feed from '../../components/Feed';

const Main = () => {
    return (
        <div>
            <header>
                <h1>React Youtube Favorites</h1>
            </header>
            <Feed />
        </div>
    )
}

export default Main;