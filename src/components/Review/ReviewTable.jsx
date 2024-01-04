import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import SortIcon from "../SortIcon/SortIcon";
import SearchField from "../SearchField/SearchField";
import SurveyUnitLine from "./SurveyUnitLine";
import PaginationNav from "../PaginationNav/PaginationNav";
import D from "../../i18n";
import Utils from "../../utils/Utils";

class ReviewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { size: 10, page: 1 },
      checkboxArray: props.data?.map((element) => {return  {id: element.id, isChecked: false}}) ?? [],
      checkAll: false,
      show: false,
      displayedLines: props.data,
      showComment: false,
      suToModifySelected: "",
      oldComment: "",
      newComment: "",
    };
  }

  handlePageChange(pagination) {
    const checkAll = Utils.getCheckAllValue(this.state.checkboxArray, pagination)
    this.setState({ pagination , checkAll});
  }

  updateLines(matchingLines) {
    const { pagination, checkboxArray } = this.state;
    const newCheckboxArray = checkboxArray.map((element) => {return  {id :element.id, isChecked: false}})
    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: false,
      pagination: { size: pagination.size, page: 1 },
      displayedLines: matchingLines,
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCloseComment() {
    this.setState({ showComment: false });
  }

  handleShowComment(line) {
    this.setState({ showComment: true, suToModifySelected: line.id });
    if (line.comments != null) {
      let comToSet = "";
      const comment = line.comments.find((c) => c.type === "MANAGEMENT");
      if (comment) {
        comToSet = comment.value;
      }
      this.setState({ oldComment: comToSet });
    } else {
      this.setState({ oldComment: "" });
    }
  }

  view(line) {
    const { viewSU } = this.props;
    if (!line.viewed) {
      viewSU(line.id);
    }
  }

  validateComment() {
    const { validateUpdateComment } = this.props;
    const { suToModifySelected, newComment } = this.state;
    validateUpdateComment(suToModifySelected, newComment);
  }

  validateSU() {
    const { validateSU } = this.props;
    const { checkboxArray } = this.state;
    const ids = checkboxArray
      .filter((su) => su.isChecked)
      .map((su) => su.id);
    validateSU(ids);
  }

  handleCheckAll(e) {
    const { checkboxArray, displayedLines, pagination} = this.state;
    
    const newCheckboxArray = Utils.handleCheckAll(e.target.checked, checkboxArray, displayedLines, pagination);

    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: e.target.checked,
    });
  }

  isDisabled() {
    const { checkboxArray } = this.state;
    return !checkboxArray.some((element) => element.isChecked );
  }

  toggleCheckBox(id) {
    const { checkboxArray, pagination, displayedLines } = this.state;
   
    const {newCheckboxArray, newCheckAll} = Utils.getOnToggleChanges(id, checkboxArray, displayedLines, pagination);

    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: newCheckAll,
    });
  }

  render() {
    const { sort, data, handleSort, dataRetreiver } = this.props;
    const {
      displayedLines,
      pagination,
      checkboxArray,
      checkAll,
      show,
      showComment,
      suToModifySelected,
      oldComment,
    } = this.state;
    const fieldsToSearch = ["campaignLabel", "interviewer", "id"];
    const toggleCheckBox = (i) => {
      this.toggleCheckBox(i);
    };
    const view = (line) => {
      this.view(line);
    };
    const handleCloseComment = () => {
      this.handleCloseComment();
    };
    const handleShowComment = (line) => {
      this.handleShowComment(line);
    };
    function handleSortFunct(property) {
      return () => {
        handleSort(property);
      };
    }
    return (
      <div>
        <Row>
          <Col xs="6">
            <PaginationNav.SizeSelector
              updateFunc={(newPagination) =>
                this.handlePageChange(newPagination)
              }
            />
          </Col>
          <Col xs="6" className="text-right">
            <SearchField
              data={data}
              searchBy={fieldsToSearch}
              updateFunc={(matchinglines) => this.updateLines(matchinglines)}
            />
          </Col>
        </Row>
        <Table
          id="SUTable"
          className="CustomTable"
          bordered
          striped
          hover
          responsive
          size="sm"
        >
          <thead>
            <tr>
              <th className="CheckboxCol" onClick={(e) => this.handleCheckAll(e)}>
                <input
                  type="checkbox"
                  name="checkAll"
                  readOnly
                  checked={checkAll}
                />
              </th>
              <th
                onClick={handleSortFunct("campaignLabel")}
                className="Clickable ColCampaign"
              >
                <SortIcon val="campaignLabel" sort={sort} />
                {D.survey}
              </th>
              <th onClick={handleSortFunct("id")} className="Clickable ColId">
                <SortIcon val="id" sort={sort} />
                {D.identifier}
              </th>
              <th
                onClick={handleSortFunct("interviewer")}
                data-testid="TableHeader_interviewer_name_review"
                className="Clickable ColInterviewer"
              >
                <SortIcon val="interviewer" sort={sort} />
                {D.interviewer}
              </th>
              <th className="ColAction">{D.listSuActions}</th>
            </tr>
          </thead>
          <tbody>
            {displayedLines
              .slice(
                (pagination.page - 1) * pagination.size,
                Math.min(
                  pagination.page * pagination.size,
                  displayedLines.length
                )
              )
              .map((line) => {
                const element = checkboxArray.filter((element) => element.id === line.id)[0]
                return <SurveyUnitLine
                  key={line.id}
                  lineData={line}
                  dataRetreiver={dataRetreiver}
                  isChecked={element?.isChecked ?? false}
                  view={() => view(line)}
                  updateFunc={() => toggleCheckBox(line.id)}
                  handleShow={() => handleShowComment(line)}
                />
              })}
            <Modal show={showComment} onHide={() => handleCloseComment()}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {D.modifiedCommentSu + suToModifySelected}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>{D.modifiedCommentSuLastComment}</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    defaultValue={oldComment}
                    onChange={(e) =>
                      this.setState({ newComment: e.target.value })
                    }
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    {D.modifyCommentSuHelpText}
                  </Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  data-testid="close-modal"
                  onClick={() => handleCloseComment()}
                >
                  {D.cancel}
                </Button>
                <Button
                  variant="primary"
                  data-testid="confirm-update-comment"
                  onClick={() => {
                    this.validateComment();
                    handleCloseComment();
                  }}
                >
                  {D.validate}
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </Table>
        <div className="tableOptionsWrapper">
          <button
            id="btnValider"
            type="button"
            className="btn btn-primary"
            disabled={this.isDisabled()}
            data-testid="validate-su"
            onClick={() => this.handleShow()}
          >
            {D.validate}
          </button>
          <PaginationNav.PageSelector
            pagination={pagination}
            updateFunc={(newPagination) => {
              this.handlePageChange(newPagination);
            }}
            numberOfItems={displayedLines.length}
          />
        </div>

        <Modal show={show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton />
          <Modal.Body>
            {D.reviewValidatePopupBodyPart1}
            {checkboxArray.filter((element) => element.isChecked).length}
            {D.reviewValidatePopupBodyPart2}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              data-testid="close-modal"
              onClick={() => this.handleClose()}
            >
              {D.close}
            </Button>
            <Button
              variant="primary"
              data-testid="confirm-validate"
              onClick={() => {
                this.validateSU();
                this.handleClose();
              }}
            >
              {D.popupConfirm}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ReviewTable;
