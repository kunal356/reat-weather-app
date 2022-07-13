import React,{useState,useEffect} from 'react'
import "./style.css"
import WeatherCard from './weatherCard'

const Temp = () => {
    const [searchValue, setSearchValue] =useState("pune");
    const [tempInfo,setTempInfo]=useState({});

    const getWeatherInfo = async()=> {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=fd6d4f1fe4bf436fedfe54c0f14b1728`;
            const res =await fetch(url);
            const data = await res.json();
            const {temp,humidity,pressure} = data.main;
            const{main:weathermood} =data.weather[0];
            const{name}=data;
            const{speed}=data.wind;
            const{country,sunset}=data.sys;

            const myNewWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTempInfo(myNewWeatherInfo)
            console.log(temp)
            // console.log(data);
        } catch (error) {
            console.log(error);
        }

        
    }
    useEffect(() => {
      getWeatherInfo();
    }, []);


  return (
    <>
        <div className="wrap">

            <div className="search">

                <input type="search" 
                    placeholder='search...'
                    autoFocus
                    id='search'
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    className='searchTerm'
                />

                <button className="searchButton" type='button' onClick={getWeatherInfo}>
                    Search
                </button>
                
            </div>
        </div>
        <WeatherCard {...tempInfo}/>
                
    </>
  )
}

export default Temp