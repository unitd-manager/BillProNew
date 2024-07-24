import React, { useState, useEffect } from 'react';
import { Row, Col, TabContent,Table, TabPane, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams, useNavigate,Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
//import ProjectButton from '../../components/ProjectTable/ProjectButton';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AddEmployee from '../../components/ProjectTabContent/AddEmployee';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import ProjectEditForm from '../../components/project/ProjectEditForm';
import ProjectMaterialLineItem from '../../components/project/ProjectMaterialLineItem';
import EditProjectMaterialLineItemModal from '../../components/project/EditProjectMaterialLineItemModal'
import CommonTable from '../../components/CommonTable';
import StatsPmsProjectId from '../../components/dashboard/ProjectStats/StatsPmsProjectId';
import DueStatsProject from '../../components/dashboard/ProjectStats/DueStatsProject';
import MilestoneStatsProject from '../../components/dashboard/ProjectStats/MilestoneStatsProject';
import AverageStatsProject from '../../components/dashboard/ProjectStats/AverageStatsProject';
import ActualHourStatsProject from '../../components/dashboard/ProjectStats/ActualHourStatsProject';
import PriorityStatsProject from '../../components/dashboard/ProjectStats/PriorityStatsProject';
import ProjectMilestones from '../../components/ProjectMilestones';
import ProjectMilestoneEdit from '../../components/ProjectMilestoneEdit';
import ApiButton from '../../components/ApiButton';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

 // const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/project/getTranslationForProject')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const [projectDetail, setProjectDetail] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [incharge, setIncharge] = useState();
  const [lineItem, setLineItem] = useState([]);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [editTaskEditModals, setEditTaskEditModals] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [contact, setContact] = useState();
  const [materialItem, setMaterialItem] = useState();
  const [editMaterialModelItem, setEditMaterialModelItem] = useState(null); 
  const [addMaterialItemModal, setAddMaterialItemModal] = useState(false);
  const [viewMaterialModal, setViewMaterialModal] = useState(false);
  const [editMaterialModal, setEditMaterialModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactDatas] = useState();
  const [milestoneById, setMilestone] = useState();
  const [addContactModals, setAddContactModals] = useState(false);

  const addMaterialItemsToggle = () => {
    setAddMaterialItemModal(!addMaterialItemModal);
  };
  const viewMaterialToggle = () => {
    setViewMaterialModal(!viewMaterialModal);
  };
  const addContactToggles = () => {
    setAddContactModals(!addContactModals);
  };
  console.log(viewMaterialToggle);
  // Start for tab refresh navigation #Renuka 31-05-23
  const tabs = [
    { id: '1', name: 'Analytics' },
    { id: '2', name: 'Milestones' },
    { id: '3', name: 'Quotation' },
    { id: '4', name: 'Material Needed' },
    { id: '5', name: 'Project Team' },
    { id: '6', name: 'Job Order' },
  ];
  const tabsArb = [
    { id: '1', name: 'التحليلات' },
    { id: '2', name: 'معالم' },
    { id: '3', name: 'اقتباس' },
    { id: '4', name: 'المواد المطلوبة ' },
    { id: '5', name: 'فريق المشروع' },
    { id: '6', name: 'أمر الوظيفة' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  const columns1 = [
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Title')?.[genLabel],
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdProject.Description')?.[genLabel],
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdProject.Qty')?.[genLabel],
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdProject.Unit Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Amount')?.[genLabel],
    },
  ];

  const columns2 = [
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Title')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Description')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Qty')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Unit Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Amount')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Updated By')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Action')?.[genLabel],
    },
  ];
  const [tenders, setTenders] = useState(null);
  

  const getTenders = () => {
    api
      .post('/joborder/getProjectJobOrderById',{project_id:id})
      .then((res) => {
        setTenders(res.data.data); 
      });
  };
  useEffect(() => {
    getTenders();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'project_job_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find(item => item.key_text === 'mdProject.Job Order No')?.[genLabel],
      selector: 'job_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Job Order Title')?.[genLabel],
      selector: 'job_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Date')?.[genLabel],
      selector: 'job_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.SubCon Title')?.[genLabel],
      selector: 'sub_con_title',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Reference')?.[genLabel],
      selector: 'ref_no_job',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  
    {
      name: arabic.find(item => item.key_text === 'mdProject.Status')?.[genLabel],
      selector: 'job_status',
      sortable: true,
      width: 'auto',
    },
    {
        name: arabic.find(item => item.key_text === 'mdProject.Net Amount')?.[genLabel],
        selector: 'total_amount',
        sortable: true,
        width: 'auto',
      },
  ];

  // Get Project By Id
  const getProjectById = () => {
    api
      .post('/project/getProjectById', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data[0]);
      })
      .catch(() => {});
  };
  const ProposalId = projectDetail?.proposal_id;
  console.log('ProposalId', ProposalId);
  
  const getContact = () => {
    api
      .post('/project/getContactLinkedByProjectId', { project_id: id })
      .then((res) => {
        setContact(res.data.data);
      })
      .catch(() => {});
  };
  const getMilestoneById = () => {
    api
      .post('/milestone/getMilestoneProjectById', { project_id: id })
      .then((res) => {
        setMilestone(res.data.data);
      })
      .catch(() => { });
  };
  const getMaterialItem = () => {
    api.post('/project/getProjectMaterialLineItemsById', { project_id: id }).then((res) => {
      setMaterialItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };
  const deleteMaterial = (deleteLine) => {
    Swal.fire({
      title: `Are you sure? ${deleteLine}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/project/deleteProjectMaterialneed', { project_material_needed_id: deleteLine }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
  const getIncharge = () => {
    api
      .get('/tender/projectIncharge')
      .then((res) => {
        setIncharge(res.data.data);
      })
      .catch(() => {});
  };
  const UpdateData = () => {
    setFormSubmitted(true);
    if(projectDetail.category.trim() !== '')
    api.post('/project/edit-Project', projectDetail).then(() => {
      message('Record editted successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  };
  console.log('ProposalId1',ProposalId)
  const getLineItem = () => {
    api.post('/project/getQuoteLineItemsById', { project_id:id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  
  useEffect(() => {
    getProjectById();
    getMilestoneById();
    getContact();
    getIncharge();
    getLineItem();
    getMaterialItem();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      {/* <ProjectButton
        UpdateData={UpdateData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        arb={arb}
      ></ProjectButton> */}
<ApiButton
              editData={UpdateData}
              navigate={navigate}
              applyChanges={UpdateData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Project"
            ></ApiButton>
      <ProjectEditForm
        projectDetail={projectDetail}
        setProjectDetail={setProjectDetail}
        contact={contact}
        incharge={incharge}
        formSubmitted={formSubmitted}
        arb={arb}
        arabic={arabic}
        genLabel={genLabel}
      />

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
       
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />: <Tab toggle={toggle} tabs={tabs} />
        }

        <TabContent className="p-4" activeTab={activeTab}>
     

          <TabPane tabId="1">
            <br />
            <Row>
              <Col>
                <StatsPmsProjectId id={id}></StatsPmsProjectId>
              </Col>
              <Col>
                <DueStatsProject id={id}></DueStatsProject>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="4" lg="10" xl="6" xxl="6">
                <MilestoneStatsProject id={id}></MilestoneStatsProject>
              </Col>
              <Col sm="4" lg="10" xl="6" xxl="6">
                <AverageStatsProject id={id}></AverageStatsProject>
              </Col>
            </Row>
            <br />
            <ActualHourStatsProject id={id}></ActualHourStatsProject>
            <br />
            <PriorityStatsProject id={id}></PriorityStatsProject>
          </TabPane>
          <TabPane tabId="2">
            <br />
            <ProjectMilestones
              setContactDatas={setContactDatas}
              id={id}
              addContactToggles={addContactToggles}
              addContactModals={addContactModals}
              setEditTaskEditModals={setEditTaskEditModals}
              milestoneById={milestoneById}
              getMilestoneById={getMilestoneById}
            ></ProjectMilestones>
            <ProjectMilestoneEdit
              getMilestoneById={getMilestoneById}
              contactData={contactData}
              editTaskEditModals={editTaskEditModals}
              setEditTaskEditModals={setEditTaskEditModals}
            ></ProjectMilestoneEdit>
          </TabPane>
 
          <TabPane tabId="3">
            {/* <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                  Add Quote Items
                </Button>
              </Col>
            </Row> */}
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.proposal_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
          </TabPane>
          <TabPane tabId="4">
          <Row>
                <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addMaterialItemsToggle.bind(null)}
                >
                {arb?'إضافة عناصر المواد':'Add Material Items'}
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns2.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {materialItem &&
                      materialItem.map((e, index) => {
                        return (
                          <tr key={e.project_quote_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By">{e.created_by} {e.creation_date}</td>
                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditMaterialModelItem(e);
                                  setEditMaterialModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteMaterial(e.project_material_needed_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            <EditProjectMaterialLineItemModal
              editMaterialModal={editMaterialModal}
              setEditMaterialModal={setEditMaterialModal}
              FetchMaterialItemData={editMaterialModelItem}
              getMaterialItem={getMaterialItem}
              setViewMaterialModal={setViewMaterialModal}
              projectDetail={projectDetail}
              arb={arb}
              arabic={arabic}
              genLabel={genLabel}
              //insertquote={insertquote}
            ></EditProjectMaterialLineItemModal>
            {addMaterialItemModal && (
              <ProjectMaterialLineItem
                //projectInfo={tenderId}
                addMaterialItemModal={addMaterialItemModal}
                setAddMaterialItemModal={setAddMaterialItemModal}
                projectLine={id}
                arb={arb}
                arabic={arabic}
                genLabel={genLabel}
              ></ProjectMaterialLineItem>
            )}
          </TabPane>
          <TabPane tabId="5" eventkey="addEmployee">
            <Row>
              <AddEmployee ProposalId ={ProposalId}projectId={id}arb={arb}arabic={arabic}genLabel={genLabel}/>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Tender');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF','OGG']);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.File className="rounded-circle" width="20" />
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="TenderRelated Data"
              desc="TenderRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="Tender"
              recordType="RelatedPicture"
              update={update}
              setUpdate={setUpdate}
            />
          </TabPane>
          <TabPane tabId="6">
            
            <CommonTable 
             title="JobOrder List">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.project_job_id}>
                    <td>{index + 1}</td>
                    <td>
                    <Link to={`/ProjectJobOrderEdit/${element.project_job_id}`}>{element.job_code}</Link>
                      {/* <Link to={`/ProjectJobOrderEdit/${element.project_job_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link> */}
                    </td>
                    <td>{element.job_title}</td>
                    <td>{element.job_date}</td>
                    <td><Link to={`/SubConEdit/${element.sub_con_id}`}>{element.sub_con_title}</Link></td>
                    <td>{element.ref_no_job}</td>
                    <td>{element.job_status}</td>
                    <td>{element.amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        </TabPane>
          {/* End Tab Content 12 */}
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
