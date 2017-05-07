import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    {" "}
                    <code>src/App.js</code>
                    {" "}
                    and save to reload.
                </p>

                <SampleComponent />
            </div>
        );
    }
}

const styles = {
    button: {
        margin: "20px",
        float: "right"
    },
    container: {
        width: "350px",
        margin: "0 auto"
    }
};

class SampleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            accNumber: "",
            githubEmail: "",
            slackEmail: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox"
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    renderPage() {
        switch (this.state.pageNo) {
            case 0:
                return <BasicInfo />;
            case 1:
                return (
                    <GetBankAccountNumber
                        accNumber={this.state.accNumber}
                        handleInputChange={this.handleInputChange}
                    />
                );
            case 2:
                return (
                    <GetEmailForSlackAndGithub
                        githubEmail={this.state.githubEmail}
                        slackEmail={this.state.slackEmail}
                        handleInputChange={this.handleInputChange}
                    />
                );
            case 3:
                return <SummaryPage {...this.state} nextPage={this.nextPage} />;
            case 4:
            default:
                return <Conclusion />;
        }
    }

    nextPage() {
        this.setState(prevState => {
            return {
                pageNo: prevState.pageNo + 1
            };
        });
    }

    render() {
        // console.log(this.state);
        return (
            <div style={styles.container}>
                {this.renderPage()}

                {this.state.pageNo !== 3 &&
                    <button style={styles.button} onClick={this.nextPage}>
                        Next
                    </button>}

            </div>
        );
    }
}

const Conclusion = props => {
    return (
        <div>
            <h2>
                Welcome to the end of the React demonstration!
            </h2>
            <p>
                {"Check out the source code of this demo "}
                <a href="https://github.com/xuatz/fs-onboarding">here</a>
                !
            </p>
        </div>
    );
};

const SummaryPage = props => {
    let API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";
    let { accNumber, githubEmail, slackEmail } = props;

    return (
        <div>
            <h2>
                Is the information correct?
            </h2>

            <div>
                <label>
                    Bank Account Number:
                </label>
                {props.accNumber}
            </div>
            <div>
                <label>
                    Github Email:
                </label>
                {props.githubEmail}
            </div>
            <div>
                <label>
                    Slack Email:
                </label>
                {props.slackEmail}
            </div>

            <button
                onClick={() => {
                    axios
                        .post(API_URL + "/submitInfo", {
                            data: {
                                accNumber,
                                githubEmail,
                                slackEmail
                            }
                        })
                        .then(res => {
                            console.log(res);
                            if (res.status === 200) {
                                props.nextPage();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert("there is an error!");
                        });
                }}>
                Submit
            </button>
        </div>
    );
};

const BasicInfo = props => {
    return (
        <div>
            <h2>
                wifi ssid - {process.env.REACT_APP_WIFI_SSID}
            </h2>
            <p>
                password: - {process.env.REACT_APP_WIFI_PW}
            </p>
        </div>
    );
};

const GetEmailForSlackAndGithub = props => {
    return (
        <div>
            <h2>
                Email to use for...
            </h2>

            <div>
                <label>
                    github:
                </label>
                <input
                    type="email"
                    name="githubEmail"
                    value={props.githubEmail}
                    onChange={props.handleInputChange}
                />
            </div>
            <div>
                <label>
                    slack:
                </label>
                <input
                    type="email"
                    name="slackEmail"
                    value={props.slackEmail}
                    onChange={props.handleInputChange}
                />
            </div>

        </div>
    );
};

const GetBankAccountNumber = props => {
    return (
        <div>
            <label>
                Bank Account No:
            </label>

            <input
                type="number"
                name="accNumber"
                value={props.accNumber}
                onChange={props.handleInputChange}
            />
        </div>
    );
};

export default App;
