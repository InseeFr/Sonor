import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../MainScreen/MainScreen';
import CampaignPortal from '../CampaignPortal/CampaignPortal';
import ListSU from '../ListSU/ListSU';
import MonitoringTable from '../MonitoringTable/MonitoringTable';
import Review from '../Review/Review';
import Remind from '../Remind/Remind';
import DataFormatter from '../../utils/DataFormatter';
import ModalPreferences from '../ModalPreferences/ModalPreferences';
import D from '../../i18n';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreferences: false,
      preferences: {},
    };
    this.dataRetreiver = new DataFormatter(props.token);
  }

  componentDidMount() {
    this.loadPreferences();
  }

  loadPreferences() {
    this.dataRetreiver.getPreferences((preferences) => {
      this.setState({ preferences });
    });
  }

  updatePreferences(newPreferences) {
    this.dataRetreiver.updatePreferences(newPreferences, (res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        NotificationManager.success(D.preferencesUpdated, D.updateSuccess, 3500);
      } else {
        NotificationManager.error(D.preferencesNotUpdated, D.error, 3500);
      }
    });
    this.loadPreferences();
  }

  showPreferences() {
    this.setState({ showPreferences: true });
  }

  hidePreferences() {
    this.setState({ showPreferences: false });
  }

  render() {
    const { showPreferences, preferences } = this.state;
    const { userData } = this.props;

    return (
      <div>
        <Router>
          <div>
            <Header
              user={userData}
              showPreferences={() => {
                this.showPreferences();
              }}
            />
            <Switch>
              <Route path="/review/:id?" component={(routeProps) => <Review dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/followUp" component={(routeProps) => <Remind dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/follow" component={(routeProps) => <MonitoringTable dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/listSU/:id" component={(routeProps) => <ListSU dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/portal/:id" component={(routeProps) => <CampaignPortal dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/" component={() => <MainScreen preferences={preferences} dataRetreiver={this.dataRetreiver} />} />
            </Switch>
          </div>
        </Router>
        <ModalPreferences
          preferences={preferences}
          showPreferences={showPreferences}
          hidePreferences={() => this.hidePreferences()}
          updatePreferences={(prefs) => this.updatePreferences(prefs)}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default View;
