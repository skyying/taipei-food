import "./style/main.scss";
import "./style/reset.scss";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {setContext} from "apollo-link-context";
import {config} from "./yelpConfig.js";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Category} from "./components/category.js";
import {ResultList} from "./components/searchResult.js";
import {ResultTitle} from "./components/resultTitle.js";
import {FilterList} from "./components/FilterList.js";
import {data} from "./data/data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      price: {$: false, $$: false, $$$: false, $$$$: false},
      isOpenNow: false
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateOpenTime = this.updateOpenTime.bind(this);
  }

  handleChangeInput(e) {
    return this.setState({keyword: e.currentTarget.value});
  }
  updatePrice(opt) {
    this.setState(prevState => {
      let priceTag = {};
      priceTag[opt] = !prevState.price[opt];
      return {price: Object.assign(prevState.price, priceTag)};
    });
  }
  updateOpenTime() {
    this.setState(prevState => {
      return {isOpenNow: !prevState.isOpenNow};
    });
  }
  render() {
    console.log(this.state);

    const itemListData = data.data.search.business;
    const getIsOpenNow = hours => {
      // loop through all hours slot
      let weekDay = new Date().getDay();
      let nowHour = new Date().getHours();
      let nowMin = new Date().getMinutes();
      let now = "" + nowHour + nowMin;
      return hours.some((slot, index) => {
        let {start, end} = slot.open[weekDay - 1];
        return start <= now && now <= end;
      });
    };

    let list = itemListData.filter((item, index) => {
      return this.state.price[item.price];
    });

    if (this.state.isOpenNow) {
      list = list.filter(item => getIsOpenNow(item.hours));
    }

    return (
      <div>
        <input
          value={this.state.keyword}
          onChange={this.handleChangeInput}
        />
        <div>Near Taipei</div>
        <button>Search</button>
        <Category options={["seafood", "chinese"]} />
        <ResultTitle />
        <FilterList
          price={this.state.price}
          openTime={this.state.isOpenNow}
          updatePrice={this.updatePrice}
          updateOpenTime={this.updateOpenTime}
        />
        <ResultList list={list} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
