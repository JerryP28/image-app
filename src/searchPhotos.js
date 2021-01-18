import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Axios from "axios";
import Alert from "./Alert";



const unsplash = new Unsplash({
  accessKey: "r_HDwU-gGZ4PjO0oiI6rpSWFi2qvFvR5jmVnC9ekLYs",
});
export default function SearchPhotos() {

  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  const [alert, setAlert] = useState("");



  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(Unsplash);
      if (!result.data.more) {
        return setAlert("No image with such name");
      }
      console.log(result);
      setPics(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please type the serach bar");
    }
  };



  const searchPhotos = async (e) => {
    e.preventDefault();
    getData();

    unsplash.search
      .photos(query)
      .then(toJson)
      .then((json) => {
        // console.log(json);
        setPics(json.results);
      });

  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        {alert !== "" && <Alert alert={alert} />}

        <label className="label" htmlFor="query">

        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Search here`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {pics.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}{" "}
      </div>
    </>
  );
}
