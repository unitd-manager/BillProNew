import React, { useEffect, useState } from 'react';
import { Button,Card,Row,Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { useParams,useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import ComponentCardV2 from '../../components/ComponentCardV2';

const BillOfMaterials = () => {
  //Const Variables
  const [planning, setPlanning] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  };
  // get Leave
  const getPlanning = () => {
      api
      .post('/planning/getPlanningBomShortageById', { planning_cpanel_id: id })
      .then((res) => {
        setPlanning(res.data.data);
       setOrder(res.data.data[0])
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const deleteAllRecords = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete all records!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/planning/deleteAllInventoryHistory')
          .then(() => {
            Swal.fire('Deleted!', 'All records have been deleted.', 'success');
            message('All shortlist data deleted successfully', 'success');
          })
          .catch(() => {
            message('Unable to delete all records.', 'error');
          });
      }
    });
  };
  

console.log('planning',planning)
  useEffect(() => {
    $('#example').DataTable({
      pagingType: 'full_numbers',
      pageLength: 20,
      processing: true,
      dom: 'Bfrtip',
      // buttons: [
      //   {
      //     extend: 'print',
      //     text: 'Print',
      //     className: 'shadow-none btn btn-primary',
      //   },
      // ],
    });
    getPlanning();
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
    },
    {
      name: 'Item number',
     
    },
    {
      name: 'Product name',
      
    },
    {
      name: 'BOM Unit',
     
    },
    {
      name: 'Qty',
     
    },
    {
      name: 'Act Stock',
     
    },
    {
      name: 'Reserve Stock/pcs',
     
    },
    {
      name: 'Reserve Total',
     
    },
    {
      name: 'Stock date',
     
    },

    {
      name: 'Matrl Shortage Qty',
      
    },
    {
      name: 'Matrl Shortage',
     
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs /> 
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  deleteAllRecords()
                }}
              >
                Clear the shortlist data
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
        <CommonTable
          loading={loading}
          title="Bill Of Materials"
          
          ExportButton={
            <>
            <Col>
              <Button color="primary" className="shadow-none">
                Export
              </Button>
              
            </Col>
            </>
          }
        > <Card  color='blue'>
          <div style={{padding:'5px', display:'flex',flex:'row',justifyContent:'space-between',fontSize:20}}><span>Ordered Qty:    {order && order.ordered_qty}</span></div></Card>
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.planning_cpanel_id}>
                    <td>{i + 1}</td>
                    <td>{element.item_number}</td>
                    <td>{element.product_name}</td>
                    <td>{element.bom_unit}</td>
                    <td>{element.qty}</td>
                    <td>{element.actual_stock}</td>
                    <td>{element.reserve_stock}</td>
                    <td>{element.inventory_reserve_stock}</td>
                    <td>{element.stockDate}</td>
                    <td>{element.matrl_shortage_qty}</td>
                    <td>{element.matrl_shortage}</td>
                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default BillOfMaterials;
