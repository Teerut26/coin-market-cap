import React, { Component } from "react";

export class Card extends Component {
  coverTime = (time) => {
    var d = new Date(time);
    var n = d.getFullYear();
    return n;
  };

  nFormatter = (num, digits) => {
    var si = [
      {
        value: 1,
        symbol: "",
      },
      {
        value: 1e3,
        symbol: "k",
      },
      {
        value: 1e6,
        symbol: "M",
      },
      {
        value: 1e9,
        symbol: "B",
      },
      // {
      //   value: 1e12,
      //   symbol: "T",
      // },
      // {
      //   value: 1e15,
      //   symbol: "P",
      // },
      // {
      //   value: 1e18,
      //   symbol: "E",
      // },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  };

  render() {
    return (
      <div className="card mb-3">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/200x200/" +
                  this.props.id +
                  ".png"
                }
              />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.title} </strong>
                <small>@{this.props.title2} </small>
                <p className="p-new">
                  Total Supply : {this.nFormatter(this.props.circulatingSupply)}
                </p>
                {this.props.maxSupply != null ? (
                  <progress
                    class="progress is-small is-info"
                    value={this.props.circulatingSupply}
                    max={this.props.maxSupply}
                  ></progress>
                ) : (
                  <progress
                  class="progress is-small"
                  value="0"
                  max="100"
                ></progress>
                )}
              </p>
            </div>
          </div>
          <div class="media-right">฿{this.nFormatter(this.props.price, 1)}</div>
        </article>
      </div>
    );
  }
}

export default Card;
