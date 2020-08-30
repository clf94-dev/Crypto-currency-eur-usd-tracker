import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Switch, Grid} from '@material-ui/core/';

import './styles/App.css';
import {useN01SwitchStyles} from '@mui-treasury/styles/switch/n01';
import Coin from './Coin';

const EurURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_" +
        "desc&per_page=100&page=1&sparkline=false";
const UsdURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_" +
        "desc&per_page=100&page=1&sparkline=false";

function App() {
  const switchStyles = useN01SwitchStyles();


    const [coins,
        setCoins] = useState([]);
    const [search,
        setSearch] = useState('');
    const [currency,
        setCurrency] = useState(true);
    const [currencyUrl,
        setUrl] = useState('EurURL');
   

    const handleClick = () => {

        console.log(currency);

        if (currency) {
            setUrl(EurURL);
            setCurrency(!currency);

        } else {
            setUrl(UsdURL);
            setCurrency(!currency);

        }

    }

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        axios
            .get(currencyUrl)
            .then(response => {
                setCoins(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, [currencyUrl]);

    return (
        <div className="coin-app">
            <div className="currency-select">
                <h1>
                    Select Currency (USD or EUR)</h1>

                <Grid
                    className='switch'
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}>
                    <Grid item className='options'>USD</Grid>
                    <Grid item>
                        <Switch
      
                            classes={switchStyles}
                            checked={!currency}
                            onClick={handleClick}
                            name="currency"/>
                    </Grid>
                    <Grid item className='options'>EUR</Grid>
                </Grid>
            </div>

            <div className="coin-search">
                <h2 className='coin-text'>
                    Search a crypto currency</h2>
                <form >
                    <input
                    style={{backgroundImage: currency?'linear-gradient(to right, #ee0979, #ff6a00)': 'linear-gradient(to right, #43cea2, #185a9d)' }}
                        type="text"
                        placeholder='Search'
                        className='coin-input'
                        onChange={handleChange}/>

                </form>
            </div>
            {filteredCoins.map(coin => {
                return (<Coin
                    key={coin.id}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    volume={coin.market_cap}
                    price={coin.current_price}
                    maxPrice={coin.high_24h}
                    minPrice={coin.low_24h}
                    priceChange={coin.price_change_percentage_24h}
                    marketcap={coin.total_volume}/>)
            })}

        </div>
    );
}

export default App;
