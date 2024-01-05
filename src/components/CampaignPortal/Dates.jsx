import React from 'react';
import Card from 'react-bootstrap/Card';
import D from '../../i18n';
import Utils from '../../utils/Utils';
import Table from 'react-bootstrap/Table';

export const DatesTable = ({identificationPhaseStartDate, collectionStartDate, collectionEndDate, endDate }) => {
    return (
        <Card className="ViewCard">
            <Card.Title className="Title">{D.dates}</Card.Title>
            <Table className="CustomTable" bordered striped responsive size="sm">
                <tbody>  
                    <tr>
                        <th className="DatesLeftHeader">{D.identificationPhaseStartDate}</th>
                        <td className="LightGreyLine VerticallyCentered">{identificationPhaseStartDate && Utils.convertToDateString(identificationPhaseStartDate)}</td>
                    </tr>
                    <tr>
                        <th className="DatesLeftHeader">{D.collectionStartDate}</th>
                        <td className="LightGreyLine VerticallyCentered">{collectionStartDate && Utils.convertToDateString(collectionStartDate)}</td>
                    </tr>
                    <tr>
                        <th className="DatesLeftHeader">{D.collectionEndDate}</th>
                        <td className="LightGreyLine VerticallyCentered">{collectionEndDate && Utils.convertToDateString(collectionEndDate)}</td>
                    </tr>
                    <tr>
                        <th className="DatesLeftHeader">{D.endDate}</th>
                        <td className="LightGreyLine VerticallyCentered">{endDate && Utils.convertToDateString(endDate)}</td>
                    </tr>
                </tbody>
            </Table>
        </Card>

    )
}