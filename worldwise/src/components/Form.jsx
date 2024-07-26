// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function ConvertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  const {createCity, isLoading} = useCities();



  useEffect(function() { 
    if(!lat && !lng)return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if(!data.countryCode) throw new Error("There is no city here. please click somewhere else ^_^");
         
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(ConvertToEmoji(data.countryCode));


        } catch (error) {
          setGeocodingError(error.message);
        }finally{
          setIsLoadingGeocoding(false);
        }
      }
    fetchCityData();
}, [lat, lng])

const handleSubmit= async(e) =>{
  e.preventDefault();

  if(!cityName || !date)return ;

  const newCity = {
    cityName,
    country,
    emoji,
    date,
    notes,
    position: {lat, lng}
  }
  await createCity(newCity);
  navigate("/App/cities");
}


if(isLoadingGeocoding)return <Spinner/>
if(geoCodingError) return <Message message={geoCodingError}/>
if(!lat && !lng)return<Message message="Start selecting city by clicking somewhere on the map"/>

  return (
    <form className={`${styles.form} ${isLoading? styles.loading: ""} `} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
        {country}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date)=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          type="data"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) =>{ 
          e.preventDefault();
          navigate(-1)
        }
        }>
            &larr; Back
            </Button>
      </div>
    </form>
  );
}

export default Form;
