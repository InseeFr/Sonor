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

  const primaryReferents = referents?.filter((referent) => referent.role === "PRIMARY") ?? [];
  const secondaryReferents = referents?.filter((referent) => referent.role === "SECONDARY") ?? [];

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
                <td className=" LightGreyLine MailLink" >{email}</td>
              </tr>
            </OverlayTrigger>
            
            {(referents === undefined || primaryReferents.length === 0) && 
              <tr>
                <th className="VerticallyCentered ContactsLeftHeader">{D.cpos}</th>
                <td>{"-"}</td>
              </tr>
            }
             
            {primaryReferents.map((primaryReferent) => {
              return (
                <tr  key={primaryReferent.phoneNumber}>
                  <th className="VerticallyCentered ContactsLeftHeader">{D.cpos}</th>
                  <td className="ContactRow">
                    <span>
                      {primaryReferent.firstName || primaryReferent.lastName ? 
                        `${primaryReferent.firstName ?? ""} ${primaryReferent.lastName ?? ""}` 
                        : "-"
                      }
                    </span>
                    <span >
                      {primaryReferent.phoneNumber ?? "-"}
                    </span>
                  </td>
                </tr>
              )
            })}
            
            {(referents === undefined || secondaryReferents.length === 0) && 
              <tr>
                <th className="VerticallyCentered ContactsLeftHeader">{D.deputyCpos}</th>
                <td>{"-"}</td>
              </tr>
            }

            {secondaryReferents.map((secondaryReferent) => {
              return (
                <tr key={secondaryReferent.phoneNumber}>
                  <th className="VerticallyCentered ContactsLeftHeader">{D.deputyCpos}</th>
                  <td className="ContactRow">
                    <span>                        
                      {secondaryReferent.firstName || secondaryReferent.lastName ? 
                        `${secondaryReferent.firstName ?? ""} ${secondaryReferent.lastName ?? ""}` 
                        : "-"
                      }
                    </span>
                    <span >
                      {secondaryReferent.phoneNumber ?? "-"}
                    </span>
                  </td>
                </tr>             
              )
            })} 
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

export default Contacts;
