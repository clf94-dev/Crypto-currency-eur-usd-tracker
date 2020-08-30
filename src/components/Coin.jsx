import React from 'react'
import './styles/App.css'
function Coin({
    image,
    name,
    classes,
    symbol,
    price,
    maxPrice,
    minPrice,
    volume,
    priceChange,
    marketcap
}) {
    return (
        <div className={classes} >
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto"/>
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">
                        ${price}
                    </p>
                    <p className="coin-price-max">${maxPrice}</p>
                    <p className="coin-price-min">${minPrice}</p>
                    <p className="coin-volume">${volume.toLocaleString()}</p>
                    {priceChange < 0
                        ? <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                        : <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>}
                    <p className="coin-marketcap">
                        Mkt Cap: ${marketcap.toLocaleString()}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Coin
