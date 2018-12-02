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
            keyword: "",
            isFirstToggle: true,
            price: {$: true, $$: true, $$$: true, $$$$: true},
            isOpenNow: false
        };
        this.updateKeyword = this.updateKeyword.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateOpenTime = this.updateOpenTime.bind(this);
    }
    componentDidMount() {
        const itemListData = jsonData.data.search.business.sort(
            (a, b) => b.rating - a.rating
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

        if (list.length) {
            list = list.filter((item, index) => {
                return (
                    this.state.price[item.price] ||
                    (this.state.isFirstToggle && item.price === null)
                );
            });
        }

        if (this.state.isOpenNow) {
            list = list.filter(item =>
                isRestaurantOpenNow(item.hours, item.name)
            );
        }

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
