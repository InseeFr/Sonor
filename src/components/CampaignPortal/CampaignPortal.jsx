import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Utils from '../../utils/Utils';
import TimeLine from './TimeLine';
import Contacts from './Contacts';
import SurveyUnits from './SurveyUnits';
import SurveySelector from '../SurveySelector/SurveySelector';
import D from '../../i18n';

function CampaignPortal({
  location, dataRetreiver,
}) {
  const initialData = {};
  initialData.interviewers = [];
  initialData.displayedInterviewers = [];
  initialData.notAttributed = { count: null };
  initialData.abandoned = { count: null };
  initialData.total = { total: null };
  const survey = location.surveyInfos ? location.surveyInfos.survey : null;
  const surveyInfo = location.surveyInfos ? location.surveyInfos.surveyInfo : null;

  const [data, setData] = useState(initialData);
  const [sort, setSort] = useState({ sortOn: null, asc: null });
  const [redirect, setRedirect] = useState(!survey ? '/' : null);

  useEffect(() => {
    dataRetreiver.getDataForCampaignPortal(!survey || survey.id, (res) => {
      setData(res);
      setRedirect(null);
    });
  }, [redirect, dataRetreiver, survey]);

  function handleSort(property, asc) {
    const [sortedData, newSort] = Utils.handleSort(property, data, sort, 'campaignPortal', asc);
    setSort(newSort);
    setData(sortedData);
  }

  return redirect
    ? <Redirect to={redirect} />
    : (
      <div id="CampaignPortal">
        <Container fluid>
          <Row>
            <Col>
              <Link to="/" className="ButtonLink">
                <Button className="ReturnButton" data-testid="return-button">{D.back}</Button>
              </Link>
            </Col>
            <Col xs={6}>
              <div className="SurveyTitle">{survey.label}</div>
            </Col>
            <Col>
              <SurveySelector
                survey={survey}
                updateFunc={(newSurvey) => setRedirect({
                  pathname: `/portal/${newSurvey.id}`,
                  surveyInfos: {
                    survey: newSurvey,
                    surveyInfo: newSurvey.allSurveys.find((s) => s.id === newSurvey.id),
                  },
                })}
              />
            </Col>
          </Row>
        </Container>
        <Card className="ViewCard">
          <Container fluid>
            <Row>
              <Col>
                <Card className="ViewCard">
                  <TimeLine props={surveyInfo} />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Contacts />
              </Col>
              <Col>
                <SurveyUnits data={data} survey={survey} sort={sort} handleSortfunc={handleSort} />
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    );
}

export default CampaignPortal;
