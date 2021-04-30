import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import SurveySelector from '../SurveySelector/SurveySelector';
import SUTable from './SUTable';
import Utils from '../../utils/Utils';
import D from '../../i18n';
import './ListSU.css';

function ListSU({
  location, dataRetreiver,
}) {
  const { survey } = location;

  const isMounted = useRef(false);
  const [data, setData] = useState([]);
  const [site, setSite] = useState('');
  const [sort, setSort] = useState({ sortOn: null, asc: null });
  const [redirect, setRedirect] = useState(!survey ? '/' : null);

  const fetchData = useCallback(() => {
    dataRetreiver.getDataForListSU(!survey || survey.id, (res) => {
      if (isMounted.current) {
        setData(res.surveyUnits);
        setSite(res.site);
        setRedirect(null);
      }
    });
  }, [dataRetreiver, survey]);

  useEffect(() => {
    isMounted.current = true;

    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  const handleSort = useCallback((property, asc) => {
    const [sortedData, newSort] = Utils.handleSort(property, data, sort, 'listSU', asc);
    setSort(newSort);
    setData(sortedData);
  }, [data, sort]);

  function validateChangingState(lstSUChangingState, state) {
    let closingCause;
    if (state === D.NPA) {
      closingCause = 'NPA';
    } else if (state === D.NPI) {
      closingCause = 'NPI';
    }
    dataRetreiver.tagWithClosingCauseSurveyUnits(lstSUChangingState, closingCause)
      .then((response) => {
        if (response.some(
          (res) => !(res.status === 200 || res.status === 201 || res.status === 204),
        )) {
          NotificationManager.error(`${D.changingStateAlertError}: ${lstSUChangingState
            .filter((x, index) => !(response[index].status === 200 || response[index].status === 201 || response[index].status === 204)).join(', ')}.`, D.error, 3500);
        } else {
          NotificationManager.success(`${D.changingStateAlertSuccess}: ${lstSUChangingState.join(', ')}.`, D.updateSuccess, 3500);
        }
        fetchData();
      });
  }

  useEffect(() => {
    if (sort.sortOn === null) {
      handleSort('id', true);
    }
  }, [data, handleSort, sort.sortOn]);

  return redirect
    ? <Redirect to={redirect} />
    : (
      <div id="ListSU">
        <Row>
          <Col>
            <Link to="/" className="ButtonLink ReturnButtonLink">
              <Button className="ReturnButton" data-testid="return-button">{D.back}</Button>
            </Link>
          </Col>
          <Col xs={6}>
            <div className="SurveyTitle">{survey.label}</div>
          </Col>
          <Col id="RightCoListSU">
            <SurveySelector
              survey={survey}
              updateFunc={(newSurvey) => setRedirect({ pathname: `/listSU/${newSurvey.id}`, survey: newSurvey })}
            />
          </Col>
        </Row>
        <SUTable
          sort={sort}
          handleSort={handleSort}
          data={data}
          survey={survey}
          site={site}
          validateChangingState={
            (lstSUChangingState,
              stateModified) => validateChangingState(lstSUChangingState, stateModified)
          }
        />
      </div>
    );
}

export default ListSU;
