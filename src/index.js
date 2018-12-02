import "./style/reset.scss";
import "./style/header.scss";
import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import jsonData from "./data/yelp_response_20181003.json";
import {Category} from "./components/category.js";
import {ResultList} from "./components/searchResult.js";
import {ResultTitle} from "./components/resultTitle.js";
import {FilterOptions} from "./components/FilterOptions.js";
import {isRestaurantOpenNow} from "./logic/openTime.js";
import {getPriceState} from "./logic/getPriceState.js";
import {isMatchKeyword} from "./logic/filterKeyword.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // user input to filter search results
      keyword: "",

      // use to detect if all price tag haven't been selected yet
      isFirstToggle: true,

      // price tag to filter results
      price: {$: true, $$: true, $$$: true, $$$$: true},

      // is open now filter button selected
      isOpenNow: false
    };

    ["updateKeyword", "updatePrice", "updatePrice"].forEach(name => {
      this[name] = this[name].bind(this);
    });
  }
  componentDidMount() {
    // fetch json files, and sort fetched result by rating
    const itemListData = jsonData.data.search.business.sort(
      (itemA, itemB) => itemA.rating - itemB.rating
    );

    this.setState({list: itemListData});
  }
  updateKeyword(keyword) {
    this.setState({keyword: keyword});
  }
  updatePrice(opt) {
    this.setState(prevState => getPriceState(prevState, opt));
  }
  updateOpenTime() {
    this.setState(prevState => {
      return {isOpenNow: !prevState.isOpenNow};
    });
  }

  render() {
    let list = this.state.list || [];

    // filter results by price filter
    if (list.length) {
      list = list.filter((item, index) => {
        return (
          this.state.price[item.price] ||
                    (this.state.isFirstToggle && item.price === null)
        );
      });
    }

    // filter results by if restaurants is open now.
    if (this.state.isOpenNow) {
      list = list.filter(item =>
        isRestaurantOpenNow(item.hours, item.name)
      );
    }

    // filter results by if a user inputs any keywowrd
    if (this.state.keyword) {
      list = list.filter(item =>
        isMatchKeyword(item, this.state.keyword.toLowerCase())
      );
    }

    return (
      <div>
        <header>
          <div>
            <div className="search-row">
              <input
                value={this.state.keyword}
                placeholder="Find a restanrant"
                onChange={e =>
                  this.setState({
                    keyword: e.currentTarget.value
                  })
                }
              />
              <div className="location">
                <span>Near Taipei</span>
              </div>
            </div>
            <Category
              updateKeyword={this.updateKeyword}
              options={[
                "Hot Pot",
                "Seafood",
                "Desserts",
                "Brunch",
                "Taiwanese"
              ]}
            />
          </div>
        </header>
        <main>
          <div>
            <ResultTitle count={list.length} />
            <FilterOptions
              isFirstToggle={this.state.isFirstToggle}
              price={this.state.price}
              isOpenNow={this.state.isOpenNow}
              updatePrice={this.updatePrice}
              updateOpenTime={this.updateOpenTime}
            />
            <ResultList
              updateKeyword={this.updateKeyword}
              list={list}
            />
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
