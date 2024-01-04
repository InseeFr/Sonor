import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import D from '../../i18n';

function Contacts({email, referents}) {
  const renderTooltip = (
    <Popover id="popover-basic">
      <Popover.Content>
        {D.sendMail}
      </Popover.Content>
    </Popover>
  );

  const primaryReferents = referents?.filter((referent) => referent.role === "PRIMARY");
  const secondaryReferents = referents?.filter((referent) => referent.role === "SECONDARY");

  console.log(primaryReferents)
  return (
    <Card className="ViewCard">
      <div>
        <Card.Title className="Title">{D.contacts}</Card.Title>

        <Table className="CustomTable" bordered striped responsive size="sm">
          <tbody>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <tr
                className="Clickable"
                data-testid="mail-button"
                onClick={() => { window.location.assign(`mailto:${email}`); }}
              >
                <th className="ContactsLeftHeader">{D.functionalBox}</th>
                <td className="MailLink MailRow" >{email}</td>
              </tr>
            </OverlayTrigger>
            <tr>
              <th rowSpan="2" className="VerticallyCentered ContactsLeftHeader">{D.cpos}</th>
              {primaryReferents.map((primaryReferent) => {
                return (
                  <tr key={primaryReferent.phoneNumber}  className="LightGreyLine">
                    <td >
                      <div className='ContactRow' >
                      {primaryReferent.firstName || primaryReferent.lastName ? 
                        `${primaryReferent.firstName ?? ""} ${primaryReferent.lastName ?? ""}` 
                        : "-"
                      }
                      </div>
                      <div >
                      {primaryReferent.phoneNumber ?? "-"}
                      </div>
                    </td>
                    </tr>
                  )
                })}
            </tr>
            {/* <tr>
              <th rowSpan="2" className="VerticallyCentered ContactsLeftHeader">{D.deputyCpos}</th>
              <td className="LightGreyLine">
                {secondaryReferent.firstName || secondaryReferent.lastName ? 
                  `${secondaryReferent.firstName ?? ""} ${secondaryReferent.lastName ?? ""}` 
                  : "-"
                }
              </td>
            </tr>
            <tr>
              <td className="LightGreyLine">{secondaryReferent && secondaryReferent.phoneNumber }</td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

export default Contacts;
