import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../MainScreen/MainScreen';
import CampaignPortal from '../CampaignPortal/CampaignPortal';
import ListSU from '../ListSU/ListSU';
import Close from '../Close/Close';
import MonitoringTable from '../MonitoringTable/MonitoringTable';
import CollectionTable from '../CollectionTable/CollectionTable';
import ProvisionalStatusTable from '../ProvisionalStatusTable/ProvisionalStatusTable';
import Review from '../Review/Review';
import Remind from '../Remind/Remind';
import Notifications from '../Notifications/Notifications';
import DataFormatter from '../../utils/DataFormatter';
import ModalPreferences from '../ModalPreferences/ModalPreferences';
import D from '../../i18n';
import Terminated from '../Terminated/Terminated';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreferences: false,
      preferences: {},
      redirect: null,
      loadingPreferences: true,
      campaigns: []
    };
    this.dataRetreiver = new DataFormatter(props.token);
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.getAllCampaignsData();
  }

  componentDidUpdate(prevProps, prevState) {
    if( !this.state.campaigns.every((element) => prevState.campaigns.includes(element)) 
        || !prevState.campaigns.every((element) => this.state.campaigns.includes(element)) 
      ){
      this.loadPreferences();
    }
  }

  loadPreferences() {
    this.setState({ loadingPreferences: true });
    this.dataRetreiver.getPreferences((preferences) => {
      this.setState({ preferences, loadingPreferences: false, redirect: <Redirect to="/" /> });
    }, this.state.campaigns);
  }

  updatePreferences(newPreferences) {
    this.dataRetreiver.updatePreferences(newPreferences, (res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        NotificationManager.success(D.preferencesUpdated, D.updateSuccess, 3500);
      } else {
        NotificationManager.error(D.preferencesNotUpdated, D.error, 3500);
      }
      this.loadPreferences();
    });
  }

  showPreferences() {
    this.setState({ showPreferences: true });
  }

  hidePreferences() {
    this.setState({ showPreferences: false });
  }

  getAllCampaignsData() {
    this.dataRetreiver.getAllCampaigns((data) => {
      this.setState({campaigns: data ?? []});
    })
  }

  render() {
    const {
      showPreferences, preferences, redirect, loadingPreferences, campaigns
    } = this.state;
    const { userData } = this.props;
    return (
      <>
        <Router>
          {redirect}
          <div>
            <Header
              user={userData}
              dataRetreiver={this.dataRetreiver}
              showPreferences={() => {
                this.showPreferences();
              }}
              campaigns={campaigns}
              preferences={preferences}
            />
            <Switch>
              <Route path="/review/:id?" component={(routeProps) => <Review dataRetreiver={this.dataRetreiver} {...routeProps} campaigns={campaigns} />} />
              <Route path="/followUp" component={(routeProps) => <Remind dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/follow" component={(routeProps) => <MonitoringTable dataRetreiver={this.dataRetreiver} {...routeProps} campaigns={campaigns} />} />
              <Route path="/collection" component={(routeProps) => <CollectionTable dataRetreiver={this.dataRetreiver} {...routeProps} campaigns={campaigns} />} />
              <Route path="/provisionalstatus" component={(routeProps) => <ProvisionalStatusTable dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/terminated/:id" component={(routeProps) => <Terminated dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/listSU/:id" component={(routeProps) => <ListSU dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/portal/:id" component={(routeProps) => <CampaignPortal dataRetreiver={this.dataRetreiver} {...routeProps} campaigns={campaigns}/>} />
              <Route path="/notifications" component={(routeProps) => <Notifications dataRetreiver={this.dataRetreiver} {...routeProps} user={userData} />} />
              <Route path="/close" component={(routeProps) => <Close dataRetreiver={this.dataRetreiver} {...routeProps} />} />
              <Route path="/" component={() => <MainScreen preferences={preferences} loadingPreferences={loadingPreferences} dataRetreiver={this.dataRetreiver} campaigns={campaigns} />} />
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
      </>
    );
  }
}

export default View;
