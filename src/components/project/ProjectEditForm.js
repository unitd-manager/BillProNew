import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

const ProjectEditForm = ({ projectDetail, setProjectDetail, contact, incharge,formSubmitted,arabic,genLabel,arb }) => {
  ProjectEditForm.propTypes = {
    projectDetail: PropTypes.any,
    setProjectDetail: PropTypes.any,
    contact: PropTypes.any,
    incharge: PropTypes.any,
    formSubmitted:PropTypes.any,
    arb:PropTypes.any,
    arabic: PropTypes.any,
    genLabel:PropTypes.any,
  };
  // Edit Project
  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };


  return (
    <>
      <Form>
        <FormGroup>
          <ComponentCard title="Project Details">
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Title')?.[genLabel]}
                <span className="required"> *</span>
              </Label>
                  <Input
                    type="text"
                    defaultValue={
                      arb
                        ? (
                            projectDetail && projectDetail.title_arb ? projectDetail.title_arb :
                            (projectDetail && projectDetail.title_arb !== null ? '' : projectDetail && projectDetail.title)
                          )
                        : (projectDetail && projectDetail.title)
                    }
                    name={arb ? 'title_arb': 'title'}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Category')?.[genLabel]}
                <span className="required"> *</span>
              </Label>
                  <Input
                    type="select"
                    name="category"
                    value={projectDetail && projectDetail.category}
                    onChange={handleInputs}
                    className={`form-control ${
                      formSubmitted && projectDetail.category.trim() === '' ? 'highlight' : ''
                    }`}
                  >
                    <option value="">Please Select</option>
                    <option value="Project">Project</option>
                    <option defaultValue="selected" value="Maintenance">
                      Maintenance
                    </option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                  {formSubmitted && projectDetail.category.trim() === '' && (
                      <div className="error-message">Please Select Category</div>
                    )}
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Status')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="status"
                    value={projectDetail && projectDetail.status}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option defaultValue="selected" value="WIP">
                      WIP
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Company')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    disabled
                    defaultValue={
                      arb
                        ? (
                            projectDetail && projectDetail.company_name_arb ? projectDetail.company_name_arb :
                            (projectDetail && projectDetail.company_name_arb !== null ? '' : projectDetail && projectDetail.company_name)
                          )
                        : (projectDetail && projectDetail.company_name)
                    }
                    name={arb ? 'company_name_arb': 'company_name'}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Contact')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="contact_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.contact_id}
                  >
                    <option value="selected">Please Select</option>
                    {contact &&
                      contact.map((ele) => {
                        return (
                          <option key={ele.contact_id} value={ele.contact_id}>
                            {arb?ele.first_name_arb:ele.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Start Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    name="start_date"
                    defaultValue={projectDetail && projectDetail.start_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Estimated Finish Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    name="estimated_finish_date"
                    defaultValue={projectDetail && projectDetail.estimated_finish_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Description')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    defaultValue={
                      arb
                        ? (
                            projectDetail && projectDetail.description_arb ? projectDetail.description_arb :
                            (projectDetail && projectDetail.description_arb !== null ? '' : projectDetail && projectDetail.description)
                          )
                        : (projectDetail && projectDetail.description)
                    }
                    name={arb ? 'description_arb': 'description'}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProject.Project Manager')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="project_manager_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.project_manager_id}
                  >
                    <option value="selected">Please Select</option>
                    {incharge &&
                      incharge.map((ele) => {
                        return (
                          <option value={ele.employee_id} key={ele.first_name}>
                            {arb?ele.first_name_arb:ele.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default ProjectEditForm;
