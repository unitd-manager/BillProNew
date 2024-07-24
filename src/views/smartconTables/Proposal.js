import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Proposal = () => {
  const [proposals, setProposals] = useState(null);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);

  const arb =selectedLanguage === 'Arabic'
  
  const getArabicCompanyName = () => {
      api
      .get('/proposal/getTranslationForProposal')
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

  const getProposals = () => {
    api.get('/proposal/getProposal').then((res) => {
      setProposals(res.data.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);

    getProposals();
    getArabicCompanyName();
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'proposal_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: arabic.find(item => item.key_text === 'mdproposal.Title')?.[genLabel],
      selector: 'proposal_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Quotation Code')?.[genLabel],
      selector: 'quote_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Company Name')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Contact')?.[genLabel],
      selector: 'first_name',
      sortable: true,
      grow: 0,
    },

    {
     name: arabic.find(item => item.key_text === 'mdproposal.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="Proposal List"
          module='Proposal'
          Button={
            <Link to="/ProposalDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {proposals &&
              proposals.map((element) => {
                return (
                  <tr key={element.proposal_id}>
                    <td>{element.proposal_id}</td>
                    <td>
                      <Link to={`/ProposalEdit/${element.proposal_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.title_arb ?element.title_arb : element.title}</td>
                    <td>{element.quote_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.first_name}</td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
          {/* <tfoot>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </tfoot> */}
        </CommonTable>
      </div>
    </div>
  );
};

export default Proposal;
