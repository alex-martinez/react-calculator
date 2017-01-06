import React, {Component} from 'react';

//styles
import '../scss/App.scss';

const buttonValues = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  'C', '0', '.', '+',
  '='
];
const buttonKeyCodes = buttonValues.map(key => key.charCodeAt(0));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastEquations: [],
      equation: "",
      total: null
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keypress", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress, false);
  }

  updateEquation = (value) => {
    this.setState(
      { equation: this.state.equation + value }
      // , () => console.log(this.state.equation)
    );
  }

  calculate() {
    // eslint-disable-next-line
    let total = eval(this.state.equation);
    let previousEquation = this.state.equation;

    this.setState({
      pastEquations: [previousEquation, ...this.state.pastEquations],
      equation: total,
      total: total
    });
  }

  clear() {
    this.setState({
      pastEquations: [],
      equation: "",
      total: null,
    });
  }

  handleKeyPress(e) {
    const enterKeyCode = 13;
    let pressedKeyCode = e.keyCode;
    let keyIndex = buttonKeyCodes.indexOf(pressedKeyCode)

    if(keyIndex !== -1) {
      this.updateEquation(buttonValues[keyIndex]);
    }

    if(pressedKeyCode === enterKeyCode) {
      this.calculate();
    }
  }

  renderButtons() {
    return buttonValues.map(
      value => {
        switch(value) {
          case "C":
            return (
              <button
                key={ value }
                role="button"
                className="calculator__btn"
                onClick={ e => this.clear() }
              >{ value }</button>
            );

          case "=":
            return (
              <button
                key={ value }
                role="button"
                className="calculator__btn calculator__btn--equal"
                onClick={ e => this.calculate(e) }
              >{ value }</button>
            );

          default:
            return (
              <button
                key={ value }
                role="button"
                className="calculator__btn"
                onClick={ e => this.updateEquation(e.target.innerHTML) }
              >{ value }</button>
            );
        }
      }
    );
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator__screen">
          <div className="calculator__previous-equation">{ this.state.pastEquations[1] }</div>
          <div className="calculator__previous-equation">{ this.state.pastEquations[0] }</div>
          <div className="calculator__current-equation">{ this.state.equation }</div>
        </div>

        <div className="calculator__buttons">
          { this.renderButtons() }
        </div>

        {/*
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>1</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>2</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>3</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>4</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>5</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>6</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>7</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>8</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>9</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>0</button>
          <button onClick={ e => this.updateEquation(e.target.innerHTML) }>+</button>
        */}
      </div>
    )
  }
}

export default App;
