import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatesContainer from './styles/UpdatesStyles';
import UpdatesList from './UpdatesList';


class Updates extends Component {
  state = {
    quote: "",
  }
  componentDidMount = () => {
    let QuoteArr = [
      "I've never been good with farewells so... That'll do, pig.",
      "I hate coconut! Not the taste, the consistency.",
      "Don't let them catch you with your pants down.",
      "Time to nutt up or shut up.",
      "In Mexico, you know what they call Twinkies? 'Los submarinos.'",
      "You almost knocked over your alcohol with your knife.",
      "You see? You just can't trust anyone. The first girl I let into my life and she tries to eat me.",
      "Bill Murray, you're a zombie?",
      "Haven't cried like that since Titanic.",
      "Remember mad cow diease, well mad cow diease became mad person diease witch became mad zombie diease, it's a fast acting virus witch left you angry, crazy, and with a strong case of the munches...",
      "Here's the deal, Columbus...huh Im not easy to get along with and I'm sensing you're a bit of a bitch.",
      "Woulda? Coulda? Shoulda?",
      "It's amazing how quickly thing can go from 'bad' to 'total shit-storm'.",
      "Believe it or not Twinkies have an expiration date.",
      "Can't we all drive down the road playing I - Spy or something like 4 normal americans?! Geez! Fuck me!",
      "There are 6 people left in the world and one of them is Bill Freaking Murray! I'm sorry I had to get that out.",
      "I avoided people like they were zombies before they were all zombies. Now that they are all zombies... I kinda miss people.",
      "Rule #2 The Double tap.",
      "Where are you, you spongy yellow delicious bastards?",
      "Where's the...fucking... TWINKIES?!",
      " You're a peppy little spit-fuck, aren't you?",
      "Don't kill me with my own gun!",
      "My mother always told me someday you'll be good at somethin'. Who'd have guessed that somethin' would be zombie killin'?",
      "Fasten your seat belts. This is going to be a bumpy ride.",
    ];
    let rand = Math.random();
    let totalQuotes = QuoteArr.length;
    let randIndex = Math.floor(rand * totalQuotes);
    this.setState({ quote: QuoteArr[randIndex] });
  }
  render () {
    return (
      <UpdatesContainer>
        <div className="updates-intro">
          <h1>UNCG HvZ 10th Anniversary</h1>
          <p>{this.state.quote}</p>
        </div>
        <UpdatesList />
      </UpdatesContainer>
    );
  }
}

export default Updates;
