import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { history } from '../store/configureStore';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error : 'you can also add coma separated city like Leh,Rome'
    };
  }

  updateInputValue(evt) {
    this.setState({ query: evt.target.value});
  }

  submitBtn() {
    if (this.state.query != '') {
      this.setState({ error: 'you can also add coma separated city like Leh,Rome' });
      history.push(`/weather/?city=${this.state.query}`);
    } else {
      this.setState({ error: 'Please Enter City' });
    }
  }
  
  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.container} data-tid="container">
          <div id="namer">
            <div id="namer-input">
              <input
                className="textboxforcity"
                type="text"
                name="namername"
                placeholder="Enter City"
                onChange={(e) => { this.updateInputValue(e); }}
              />
              <p className='error' >{this.state.error} </p>
              <input
                className="btn"
                type="submit"
                onClick={() => { this.submitBtn(); }}
              />
            </div>
          </div>
          <div className="counterBtn">
          <Link to="/counter" >
           <p>Counter</p>
          </Link>
        </div>
        </div>
      </div>
    );
  }
}
