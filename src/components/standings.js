import React from "react";

function standings() {
  let symbol = null;
  if(this.props.ga > 0) { symbol = '+'}

  return (
    <div>
      <tr>
        <td>{this.props.position}</td>
        <td className="badge-td">
          <div className="badge">
            <img src={this.props.badge} alt={this.props.team} />
          </div>
        </td>
        <td className="text-left">{this.props.team}</td>
        <td>{this.props.played}</td>
        <td>{this.props.won}</td>
        <td>{this.props.draw}</td>
        <td>{this.props.lost}</td>
        <td>
          {symbol}
          {this.props.ga}
        </td>
        <td>{this.props.points}</td>
      </tr>
    </div>
  );
}

export default standings;
