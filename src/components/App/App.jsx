import React from "react";
import View from "../View/View";
import DataFormatter from "../../utils/DataFormatter";
import { OIDC, ANONYMOUS } from "../../utils/constants.json";
import initConfiguration from "../../initConfiguration";
import D from "../../i18n";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      contactFailed: false,
      initialisationFailed: false,
      data: null,
    };
  }

  async componentDidMount() {
    try {
      await initConfiguration();
    } catch (e) {
      this.setState({ initialisationFailed: true });
    }
    if (window.localStorage.getItem("AUTHENTICATION_MODE") === ANONYMOUS) {
      const dataRetreiver = new DataFormatter();
      dataRetreiver.getUserInfo((data) => {
        if (data.error) {
          this.setState({ contactFailed: true });
        } else {
          this.setState({ authenticated: true, data });
        }
      });
    } else if (
      window.localStorage.getItem("AUTHENTICATION_MODE") === OIDC &&
      this.props.token
    ) {
      const dataRetreiver = new DataFormatter(this.props.token);
      dataRetreiver.getUserInfo((data) => {
        this.setState({ authenticated: data !== undefined, data });
      });
    }
  }

  async componentDidUpdate(prevprops, prevstate) {
    const { token } = this.props;

    if (
      (token && token !== prevprops.token) ||
      this.state.authenticated !== prevstate.authenticated
    ) {
      const dataRetreiver = new DataFormatter(this.props.token);
      dataRetreiver.getUserInfo((data) => {
        this.setState({ authenticated: data !== undefined, data });
      });
    }
  }

  render() {
    const { authenticated, data, contactFailed, initialisationFailed } =
      this.state;

    if (authenticated) {
      return (
        <div className="App">
          <View token={this.props.token} userData={data} />
        </div>
      );
    }
    if (initialisationFailed) {
      return <div>{D.initializationFailed}</div>;
    }
    if (contactFailed) {
      return <div>{D.cannotContactServer}</div>;
    }

    return <div>{D.initializing}</div>;
  }
}

export default App;
