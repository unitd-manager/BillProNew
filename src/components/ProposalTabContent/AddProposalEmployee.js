import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import random from 'random';
import Select from 'react-select';
import { Input, Button,Row,Col } from 'reactstrap';
import message from '../Message';
import api from '../../constants/api';


const ProposalEmployee = () => {
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      employee_name: '',
      employee_id: '',
      from_date: '',
      to_date: '',
    },
  ]);

  const [prevEmployee, setPreviousEmployee] = useState([]);
  const [apiedit, setApiEdit] = useState(false);
  const [employeeLinked, setEmployeeLinked] = useState([]);
  const { id } = useParams();

  const onchangeItem = (str, itemId) => {
    // Check if the selected employee name already exists in prevEmployee
    const isEmployeeNameAlreadySelected = prevEmployee.some(
      (item) => item.employee_name === str.label,
    );

    if (isEmployeeNameAlreadySelected) {
      alert('Employee name already exists in the list.');
      // Reset addLineItem
      setAddLineItem([
        {
          id: random.int(1, 99),
          employee_name: '',
          employee_id: '',
          position:''
        },
      ]);
    } else {
      const element = addLineItem.find((el) => el.id === itemId);
      const isNameInAddLineItem = addLineItem.some((item) => item.employee_name === str.label);

      if (!isNameInAddLineItem) {
        // Update the selected employee name
        element.employee_name = str.label;
        element.employee_id = str.value.toString();
        setAddLineItem([...addLineItem]);
      } else {
        alert('Employee name already exists in the addLineItem.');
        // Reset addLineItem
        setAddLineItem([
          {
            id: random.int(1, 99),
            employee_name: '',
            employee_id: '',
            position:''
          },
        ]);
      }
    }
  };

  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: random.int(1, 99),
        employee_name: '',
        employee_id: '',
        position:''
      },
    ]);
  };

//   const deleteTrainingStaffData = (staffId) => {
//     // ... code for deleting training staff data
//   };
const getLinkedEmployee = () => {
    // eslint-disable-next-line
    api
      .post('/proposal/getEmployeeById', { proposal_id: id })
      .then((res) => {
        const resData = res.data.data;
        const empArray = [];
        resData.forEach((element) => {
          empArray.push({
            id: random.int(1, 99),
            employee_name: element.employee_name,
            employee_id: element.employee_id,
            
            proposal_employee_id: element.proposal_employee_id,
          });
        });

        setPreviousEmployee([...empArray]);
      })
      .catch(() => {
        message('Proposal Data Not Found', 'info');
      });
  };

  const insertProposalEmployee = (proposalId, staffObj) => {
   
      api
        .post('/proposal/insertEmployee', {
          proposal_id: proposalId,
          employee_id: staffObj.employee_id,
          created_by: '1',
          modified_by: '1',
          
        })
        .then(() => {
          message('Proposal Employee Added!', 'success');
          setApiEdit(!apiedit);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
   
  };

//   const getProposaleById = () => {
//     api
//       .post('/proposal/getProposalById', { proposal_id: id })
//       .then((res) => {
//         setTrainingDetails(res.data.data[0]);
//       })
//       .catch(() => {
//         message('Proposal Data Not Found', 'info');
//       });
//   };
  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/proposal/getEmployeeName', employeeLinked).then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.employee_id, label: item.employee_name });
      });
      setEmployeeLinked(finaldat);
    });
  };

  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
    //getProposaleById();
  }, [id]);

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
    //getProposaleById();
    setAddLineItem([
      {
        id: random.int(1, 99),
        employee_name: '',
        employee_id: '',
        position:''
      },
    ]);
  }, [apiedit]);

  return (
    <div>
      {/* Training Staff */}
      <Row>
      <table className="lineitem border border-secondary rounded">
      <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Position</th>
                
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {prevEmployee &&
                prevEmployee.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="Employee Name">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.employee_id, label: item.employee_name }}
                          isDisabled={false}
                          options={employeeLinked}
                        />
                        <Input
                          value={item.employee_id.toString()}
                          type="hidden"
                          name="employee_id"
                        ></Input>
                      </td>
                      
                      <td>
                        <Input type="hidden" name="id" defaultValue={item.id}></Input>
                      </td>
                      {/* delete button from training staff*/}
                      
                    </tr>
                  );
                })}
            </tbody>
      </table>
      </Row>
      <br />
      <Row>
          <Col md="3">
            <Button
              color="primary"
              className="shadow-none"
              type="button"
              onClick={() => {
                AddNewLineItem();
              }}
            >
              Add Employee
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <table className="lineitem newemp border border-secondary rounded">
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Position</th>
                
              </tr>
            </thead>
            <tbody>
              {addLineItem.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                      <Select
                        key={item.id}
                        defaultValue={{ value: item.employee_id, label: item.employee_name }}
                        onChange={(e) => {
                          onchangeItem(e, item.id);
                        }}
                        options={employeeLinked}
                      />
                      <Input
                        value={item.employee_id.toString()}
                        type="hidden"
                        name="employee_id"
                      ></Input>
                    </td>
                    
                    <td>
                      <Input type="hidden" name="id" defaultValue={item.id}></Input>
                    </td>
                    <td data-label="Action">
                        <Link to="">
                        <Input type="hidden" name="id" defaultValue={item.id}></Input>
                        <span
                          onClick={() => {
                            insertProposalEmployee(item.employee_id,item.proposal_id);
                          }}
                        >
                          Add
                        </span>
                      </Link>
                                       
                    </td>
                    <td data-label="Action">
                    <Link to="">
                        <Input type="hidden" name="id" defaultValue={item.id}></Input>
                        <span
                          onClick={() => {
                            ClearValue(item);
                          }}
                        >
                          Clear
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
    </div>
  );
};

export default ProposalEmployee;