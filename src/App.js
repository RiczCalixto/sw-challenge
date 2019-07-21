import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import axios from "axios";

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const planetsApiUrl = "https://swapi.co/api/planets/";

class App extends Component {
  state = {
    planetName: undefined,
    population: undefined,
    climate: undefined,
    terrain: undefined,
    films: []
  };

  randomPlanet = async () => {
    const planetsResponse = await axios.get(planetsApiUrl);
    const count = planetsResponse.data.count;
    const pages = Math.floor(count / 10);
    const randomPage = randomBetween(1, pages);
    const randomPlanetsResponse = await axios.get(
      `${planetsApiUrl}?page=${randomPage}`
    );
    const randomNumber = randomBetween(0, 9);
    const {
      climate,
      population,
      terrain,
      films,
      name
    } = randomPlanetsResponse.data.results[randomNumber];
    const populatedFilms = [];
    films.forEach(async film => {
      const filmsResponse = await axios.get(film);
      this.setState(state => ({
        films: [...state.films, filmsResponse.data.title]
      }));
    });

    this.setState({
      climate,
      terrain,
      population,
      films: populatedFilms,
      planetName: name
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="wrapper">
            <div class="item">Planet name: {this.state.planetName}</div>
            <div class="item">Population: {this.state.population}</div>
            <div class="item">Climate: {this.state.climate}</div>
            <div class="item">Terrain: {this.state.terrain}</div>
            <div class="item">
              Featured in:
              {this.state.films.map(film => (
                <div key={film}>{film}</div>
              ))}
            </div>
            <div className="btn" onClick={this.randomPlanet}>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
