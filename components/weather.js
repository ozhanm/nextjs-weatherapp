"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function WeatherApp() {
    const [data, setData] = useState('');
    const [location, setLocation] = useState('');
    const [classs, setClasss] = useState('weather');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : '';

    const fetchData = async (e) => {
        e.preventDefault();

        if (location.length > 3) {
            const getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((res) => res.json())
                .then((result) => {
                    let img = '';
                    if (result.weather[0].main == 'Clear')
                        img = 'day';
                    if (result.weather[0].main == 'Clouds')
                        img = 'cloudy-day-3';
                    if (result.weather[0].main == 'Rain')
                        img = 'rainy-day-3';
                    if (result.weather[0].main == 'Snow')
                        img = 'snowy-day-3';
                    if (result.weather[0].main == 'Thunderstorm')
                        img = 'thunder';

                    // new data
                    const newdata = {
                        "image": `${baseUrl}/images/animated/${img}.svg`,
                        "title": result.weather[0].main,
                        "desc": result.weather[0].description.toUpperCase(),
                        "degree": result.main.temp.toFixed(0),
                        "humidity": result.main.humidity,
                        "wind": result.wind.speed
                    }

                    setData(newdata);

                    setTimeout(() => {
                        setClasss('weather active');
                    }, 250);

                    return result;
                });
        } else {
            setClasss('weather');
            setTimeout(() => {
                setData('');
            }, 250);
        }
    }

    return (
        <div className="container">
            <div className="search">
                <form onSubmit={fetchData}>
                    <Image src={`${baseUrl}/images/svg/location.svg`} alt="Location" width={25} height={25} />
                    <input type="text" placeholder='Enter your location' onChange={(e) => setLocation(e.target.value)} />
                    <button className="btn" onSubmit={fetchData}>
                        <Image src={`${baseUrl}/images/svg/search.svg`} alt="Search" width={20} height={20} />
                    </button>
                </form>
            </div>
            {data && (
                <div className={classs}>
                    <div className="image">
                        {data.image && (
                            <Image src={data.image} alt={data.title} width={250} height={250} />
                        )}
                    </div>
                    <div className="degree">
                        <span><b>{data.degree}</b> °C</span>
                        <p>{data.desc}</p>
                    </div>
                    <div className="info">
                        <div className="item humidity">
                            <span>%{data.humidity}</span>
                            Humidity
                        </div>
                        <div className="item wind">
                            <span>{data.wind}Km/h</span>
                            Wind Speed
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
