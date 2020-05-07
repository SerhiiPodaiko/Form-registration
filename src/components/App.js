import React, { Component } from "react";

import countries from "../data/countries";
import Field from "./Field";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      country: "",
      gender: "male",
      agree: false,
      avatar: "",
      age: 16,
      errors: {
        username: false,
        password: false,
        repeatPassword: false,
        age: false
      }
    };
  }

  getCounties = (items) => {
    return items.map((item) => (
      <option key={item.id} value={item.id}>{item.name}</option>
    ))
  };

  onSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if(this.state.username.length < 5) {
      errors.username = "Must be 5 characters or more"
    }
    if(this.state.password.length < 3) {
      errors.password = "Must be 3 characters or more"
    }
    if(this.state.password !== this.state.repeatPassword) {
      errors.repeatPassword = "Must be equal password"
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    }
    else {
      this.setState({
        errors: {}
      })
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  onChangeAgree = (event) => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  };

  onChangeAvatar = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
          avatar: event.target.result
      })
    }
    reader.readAsDataURL(event.target.files[0]);
  };

  incrementAge = () => {
    this.setState(
        (prevState, prevProps) => ({
          age: prevState.age + 1
        }),
        () => {
          console.log("callback", this.state.age);
          this.setState({
            errors: {
              age: this.state.age > 18 ? false : "Must be more 18"
            }
          });
        }
    );
  }

  decrementAge = () => {
    this.setState(
        {
          age: this.state.age - 1
        },
        () => {
          console.log("callback", this.state.age);
          this.setState({
            errors: {
              age: this.state.age > 18 ? false : "Must be more 18"
            }
          });
        }
    );
  };

  render() {
    return (
        <div className="form-container card">
          <form className="form card-body">
            <Field
              id="username"
              labelText="Username"
              type="text"
              placeholder="Enter username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={this.state.errors.username} />

            <Field
                id="password"
                labelText="Password"
                type="text"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={this.state.errors.password} />

            <Field
                id="repeatPassword"
                labelText="Enter repeat password"
                type="password"
                placeholder="Enter repeat password"
                name="repeatPassword"
                value={this.state.repeatPassword}
                onChange={this.onChange}
                error={this.state.errors.repeatPassword} />

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                  className="form-control"
                  id="country"
                  value={this.state.country}
                  name="country"
                  onChange={this.onChange}>
                {this.getCounties(countries)}
              </select>
              <fieldset className="form-group">
                <div>Gender</div>
               <div style={{paddingLeft: 17}}>
                 <input
                     type="radio"
                     className="form-check-input"
                     id="male"
                     value="male"
                     name="gender"
                     checked={this.state.gender === "male"}
                     onChange={this.onChange}/>
                 <label className="form-check-label" htmlFor="male">Male</label>
               </div>
                <div style={{paddingLeft: 17}}>
                  <input
                      type="radio"
                      className="form-check-input"
                      id="female"
                      value="female"
                      name="gender"
                      checked={this.state.gender === "female"}
                      onChange={this.onChange}/>
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </fieldset>
              <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="avatar"
                    name="avatar"
                    onChange={this.onChangeAvatar}
                    />
              </div>
              <div className="form-group">
                <div>
                  <label>Age</label>
                </div>
                <div className="btn-group">
                  <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={this.decrementAge}
                  >
                    -
                  </button>
                  <input
                      type="number"
                      className="form-control"
                      placeholder="Enter age"
                      name="age"
                      value={this.state.age}
                      onChange={this.onChange}
                  />
                  <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={this.incrementAge}
                  >
                    +
                  </button>
                </div>
                {this.state.errors.age ? (
                    <div className="invalid">{this.state.errors.age}</div>
                ) : null}
              </div>
              <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="agree"
                    name="agree"
                    value={this.state.agree}
                    checked={this.state.agree}
                    onChange={this.onChangeAgree}/>
                <label className="form-check-label" htmlFor="agree">Agree</label>
              </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        </div>
    );
  }
}