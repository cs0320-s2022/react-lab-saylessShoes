import React from 'react';
import { useState } from 'react';
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-eric.css";
import axios from "axios";

interface AstrologyProps {
    sun: string;
    moon: string;
    rising: string;
}

const TextBox = ({label, change}: {label : string; change: Function}) => {

    return (
        <div>
            <label>{label}</label>
            <input type={'text'} onChange={e => {
                change(e.target.value)
            }}/>
        </div>
    );
}

function Horoscope() {

    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");

    const [horoscope, setHoroscope] = useState(["",  "", "",  "",  ""]);

    function requestHoroscope({sun: sun, rising:rising, moon: moon} : AstrologyProps) {
        let signs = {
            sun: sun,
            moon: moon,
            rising:rising,
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post("http://localhost:4567/horoscope", signs, config)
            .then(response => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"])
            })
            .catch(error => {console.log(error);})
    }

    return (
        <div>
            <TextBox label={"Sun Sign"} change={setSun}/>
            <TextBox label={"Moon Sign"} change={setMoon}/>
            <TextBox label={"Rising Sign"} change={setRising}/>
            <AwesomeButton type={"primary"} onPress={() => {
                requestHoroscope({sun: sun, moon: moon, rising: rising})
            }}>Submit!</AwesomeButton>
            {horoscope.map((element) => {
                return( <p key={element.toString()}>{element}</p> )
            })}
        </div>
    );
}
export default Horoscope;