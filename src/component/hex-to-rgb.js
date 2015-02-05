var React = require("react");
var hexRgb = require('hex-rgb');
var rgbHex = require('rgb-hex');
var crayola = require('crayola');
var utils = require('../utils');
var GitHubLink = require('../component/github-link');

var HextoRgb = React.createClass({
  getInitialState: function() {
    var background = 'rgb' + crayola().rgb;
    var luma = utils.getLuma(background);
    return {
      defaults: {
        background: background,
        luma: luma
      },
      output: {},
      background: background,
      luma: luma
    };
  },
  handleChange: function(e) {
    var value = e.target.value;
    var type = e.target.name;
    var output = {};
    var background = this.state.defaults.background;
    var luma = this.state.defaults.luma;

    output[type] = value;

    if (utils.isHex(value)) {
      if (type === 'hex') {
        output.rgb = 'rgb(' + hexRgb(value).join(', ') + ')';
        background = output.rgb;
        luma = utils.getLuma(output.rgb);
      }
    }

    if (utils.isRgb(value)) {
      if (type === 'rgb') {
        output.hex = '#' + rgbHex.apply(this, value.replace(/[^\d,]/g, '').split(',').map(Number));
        background = output.hex;
        luma = utils.getLuma(value);
      }
    }

    this.setState({
      output: output,
      background: background,
      luma: luma
    });
  },
  render: function() {
    var inverted = (this.state.luma < 100) ? true : false;
    var style = {
      background: this.state.background
    };

    return (
      <main className="main" style={style} data-state-inverted={inverted}>
        <div className="main__control">
        <input type="text" name="hex" value={this.state.output.hex} onChange={this.handleChange} placeholder="hex" autoFocus="true" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <br />
        <input type="text" name="rgb" value={this.state.output.rgb} onChange={this.handleChange} placeholder="rgb" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <GitHubLink url="https://github.com/andreruffert/hex-to-rgb" />
        </div>
      </main>
    );
  }
});

module.exports = HextoRgb;
