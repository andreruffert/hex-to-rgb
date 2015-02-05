var React = require("react");
var hexRgb = require('hex-rgb');
var rgbHex = require('rgb-hex');
var crayola = require('crayola');
var utils = require('./utils');

var Hex2Rgb = React.createClass({
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
        <Github />
        </div>
      </main>
    );
  }
});

var Github = React.createClass({
  render: function() {
    return (
        <a href="#" className="main__github">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 512 512" preserveAspectRatio="xMinYMin meet" width="64" height="64">
            <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9c1.4,0.3,2.6,0.4,3.8,0.4c8.3,0,11.5-6.1,11.5-11.4c0-5.5-0.2-19.9-0.3-39.1c-8.4,1.9-15.9,2.7-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-0.1-14.1,1.4-14.1c0.1,0,0.1,0,0.1,0c22.5,2,34.3,23.8,34.3,23.8c11.2,19.6,26.2,25.1,39.6,25.1c10.5,0,20-3.4,25.6-6c2-14.8,7.8-24.9,14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,1.6-0.5,5-0.5c8.1,0,26.4,3.1,56.6,24.1c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7c30.2-21,48.5-24.1,56.6-24.1c3.4,0,5,0.5,5,0.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,5.4,3.1,11.5,11.4,11.5c1.2,0,2.6-0.1,4-0.4C415.9,449.2,480,363.1,480,261.7C480,134.9,379.7,32,256,32z">
            </path>
          </svg>
        </a>
    );
  }
});

React.render(
  <Hex2Rgb />,
  document.body
);
