import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const baseUrl = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency";

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromApi: [],
      dataFromApi2: [],
      show: false,
      showMore: true,
      nStart: 1,
      limitLoad: 0,
      hasMore: true,
      key: 0,
    };
    this.getData();
    // this.wss();
  }

  // componentDidMount() {
  //   this.setState({show:true})
  // }

  handleSearch = (event) => {
    let value = event.target.value.toUpperCase();
    let value2 = event.target.value;
    let result = [];
    // console.log(value);
    result = this.state.dataFromApi.filter((data) => {
      return data.symbol.search(value) !== -1 || data.name.search(value2) !== -1;
    });
    this.setState({dataFromApi2:result})
  };


  getData = () => {
    axios
      .get(
        baseUrl +
          "/listing?start=" +
          this.state.nStart +
          "&limit=20&sortBy=market_cap&sortType=desc&convert=THB"
      )
      .then((res) => {
        this.setState({ dataFromApi: res.data.data.cryptoCurrencyList });
        this.setState({ dataFromApi2: res.data.data.cryptoCurrencyList });
        this.setState({ limitLoad: res.data.data.totalCount });
        this.setState({ show: true });
        this.setState({ nStart: this.state.nStart + 20 });
        // console.log(res.data.data.cryptoCurrencyList)
      });
  };

  getDataMore = () => {
    this.setState({ showMore: false });
    axios
      .get(
        baseUrl +
          "/listing?start=" +
          this.state.nStart +
          "&limit=20&sortBy=market_cap&sortType=desc&convert=THB"
      )
      .then((res) => {
        if (res.data.data.cryptoCurrencyList.length === 0) {
          this.setState({ hasMore: false });
        }
        var joined = this.state.dataFromApi.concat(
          res.data.data.cryptoCurrencyList
        );
        this.setState({ dataFromApi: joined });
        this.setState({ dataFromApi2: joined });
        this.setState({ showMore: true });
        this.setState({ nStart: this.state.nStart + 20 });
      });
    // this.setState({ nStart: this.state.nStart + 20 });
  };

  changeData = (id, newData) => {
    for (let index = 0; index < this.state.dataFromApi.length; index++) {
      if (this.state.dataFromApi[index].id == id) {
        this.state.dataFromApi[index].quotes[0].price = newData;
        this.forceUpdate();
        break;
      }
    }
  };

  wss = () => {
    let socket = new WebSocket("wss://stream.coinmarketcap.com/price/latest");
    socket.onopen = function (e) {
      socket.send(JSON.stringify({
        method: "subscribe",
        id: "price",
        data: {
          cryptoIds: [
            1,
            1027,
            1839,
            74,
            52,
            825,
            2010,
            6636,
            1831,
            2,
            7083,
            1975,
            1321,
            3077,
            512,
            3408,
            1958,
            5426,
            2416,
            1765,
            2280,
            3717,
            1376,
            328,
            4687,
            3602,
            4172,
            1720,
            2011,
            7186,
            3718,
            7278,
            4256,
            4195,
            3794,
            5805,
            1518,
            4030,
            3635,
            2502,
            4943,
            131,
            4157,
            3890,
            5692,
            1437,
            5034,
            1274,
            873,
            6892,
            1684,
            4023,
            3957,
            4066,
            2469,
            2682,
            1168,
            4642,
            1966,
            2083,
            1697,
            4847,
            2566,
            6758,
            109,
            2586,
            2130,
            1042,
            6719,
            7129,
            2694,
            3822,
            3897,
            6535,
            5864,
            2394,
            1808,
            3513,
            1896,
            2099,
            2577,
            2700,
            5617,
            5665,
            1698,
            1567,
            1727,
            693,
            2499,
            3945,
            5567,
            3783,
            2222,
            2563,
            2405,
            2087,
            2135,
            1214,
            7288,
            8104,
          ],
          index: null,
        },
      }));
    };
    socket.onmessage = function (event) {
      const id = JSON.parse(event.data).d.cr.id
      const price = JSON.parse(event.data).d.cr.p
      // this.changeData(id,price)
      console.log(id);
    };

    socket.onclose = function (event) {
      console.log("🚀 ~ file: List.js ~ line 94 ~ List ~ event", event);
    };

    socket.onerror = function (error) {
      console.log("🚀 ~ file: List.js ~ line 99 ~ List ~ error", error);
    };
  };

  render() {
    return (
      <div>
        <input onChange={(event) => this.handleSearch(event)} className="input mb-2" type="text" placeholder="Search" />
        <InfiniteScroll
          dataLength={this.state.dataFromApi2.length}
          next={this.getDataMore}
          hasMore={this.state.hasMore}
          loader={
            <center>
              <i class="fas fa-circle-notch fa-spin"></i>
            </center>
          }
        >
          {this.state.show &&
            this.state.dataFromApi2.map((item) => (
              <Card
                price={item.quotes[0].price}
                title={item.symbol}
                circulatingSupply={item.circulatingSupply}
                maxSupply={item.maxSupply}
                dateAdded={item.dateAdded}
                id={item.id}
                title2={item.name}
              />
            ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default List;
