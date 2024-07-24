import { useEffect, useRef, useState } from 'react';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';

function App() {
  const reportTemplateRef = useRef(null);
  const [quote, setQuote] = useState();
  const { id } = useParams();

  const getQuotePDF = () => {
    api.post('tender/getQuotePDF', { quote_id: id }).then((res) => {
      setQuote(res.data.data);
    });
  };

  useEffect(() => {
    getQuotePDF();
  }, []);

  const handleDownloadPdf = async () => {
    const htmlWidth = $('.canvas_div_pdf').width();
    const htmlHeight = $('.canvas_div_pdf').height();
    const topLeftMargin = 15;
    const pdfWidth = htmlWidth + topLeftMargin * 2;
    const pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;

    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;
    const pdf = new JsPDF('p', 'pt', [pdfWidth, pdfHeight]);

    html2canvas($('.canvas_div_pdf')[0], { allowTaint: true }).then((canvas) => {
      canvas.getContext('2d');

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      pdf.addImage(
        imgData,
        'JPG',
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight,
      );

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(
          imgData,
          'JPG',
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 4,
          canvasImageWidth,
          canvasImageHeight,
        );
      }

      pdf.save('Print-Link.pdf');
    });
  };

  return (
    <div>
      <button type="button" className="button" onClick={handleDownloadPdf}>
        Generate PDF
      </button>
      <div id="pdf" className="canvas_div_pdf" ref={reportTemplateRef}>
        <div className="page-content container">
          <div className="text-blue-d2">
            <div className="row">
              <div className="col-12">
                <div className="text-center text-150">
                  <img src="/static/media/logo.9e5dbf9f.jpg" alt="Logo" />
                </div>
              </div>
            </div>

            <div className="page-tools"></div>
          </div>

          <div className="page-header text-blue-d2">
            <p className="text-sm text-grey-m2 ">
              <p className="text-sm text-grey-m2">
                Reg No:
                <small className="page-info">
                  <i className="fa fa-angle-double-right text-80"></i>
                  201526293M
                </small>
              </p>
            </p>
            <div className="row">
              <div className="col-12">
                <div className="text-center ">
                  <span className="text-default-d3">QUOTATION</span>
                </div>
              </div>
            </div>

            <div className="page-tools d-flex ">
              <div className="text-grey-m2 justify-content-end">
                <div className="my-1">10 Jalan Besar, #15-02 Sim Lim Tower,</div>
                <div className="my-1">Singapore - 208787,</div>
                <div className="my-1">Email:arif@usoftsolutions.com</div>
              </div>
            </div>
          </div>

          <div className="container px-0">
            <div className="row mt-4">
              <div className="col-12 col-lg-12">
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <span className="text-sm text-grey-m2 align-middle">To:</span>
                    </div>
                    <div className="text-grey-m2 ">
                      <div className="my-1"> {quote && quote[0].company_name}</div>
                      <div className="my-1"> {quote && quote[0].billing_address_flat}</div>
                      <div className="my-1"> {quote && quote[0].billing_address_street}</div>
                      <div className="my-1">
                        {' '}
                        {` ${
                          quote &&
                          quote[0].billing_address_country &&
                          quote[0].billing_address_po_code
                        } `}
                      </div>
                      <div className="my-1"> {quote && quote[0].email}</div>
                      <div className="my-1"> oncompany.com</div>
                    </div>
                  </div>

                  <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr className="d-sm-none" />
                    <div className="text-grey-m2">
                      <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Date : {quote && quote[0].quote_date.substring(1, 10)}
                      </div>
                      <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        {quote && quote[0].quote_code}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-12">
                    <div className="text-grey-m2 ">
                      <div className="my-1">
                        <b> {quote && quote[0].salutation && quote[0].first_name} </b>
                      </div>
                      <div className="my-1 mt-3">
                        <b>Project:-</b> {quote && quote[0].project_reference}
                      </div>
                      <div className="my-1"> Dear Sir,</div>
                      <div className="my-1 mt-3">
                        {' '}
                        With reference to the above captions, we would like to thank you for
                        inviting us to quote for the above mentioned works and we are pleased to
                        submit herewith our Value Quotation for you kind persual.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="row text-600 text-white bgc-default-tp1 py-25">
                    <div className="d-none d-sm-block col-1">Sn</div>
                    <div className="col-9 col-sm-3">Description</div>
                    <div className="d-none d-sm-block col-4 col-sm-1">EA</div>
                    <div className="d-none d-sm-block col-sm-1">Qty</div>
                    <div className="d-none d-sm-block col-sm-2">U/R(S$)</div>
                    <div className="d-none d-sm-block col-sm-2">Amt(S$)</div>
                    <div className="col-2">Remarks</div>
                  </div>

                  <div className="text-95 text-secondary-d3">
                    <div className="row mb-2 mb-sm-0 py-25">
                      {quote &&
                        quote.map((e) => {
                          return (
                            <>
                              <div className="d-none d-sm-block col-1">{e.id}</div>
                              <div className="col-9 col-sm-3">
                                {e.quote_item_title}
                                <p>{e.description}</p>
                              </div>
                              <div className="d-none d-sm-block col-4 col-sm-1">{e.unit}</div>
                              <div className="d-none d-sm-block col-sm-1">{e.quantity}</div>
                              <div className="d-none d-sm-block col-sm-2">{e.unit_price}</div>
                              <div className="d-none d-sm-block col-sm-2">{e.amount}</div>
                              <div className="col-2"></div>
                            </>
                          );
                        })}
                    </div>
                  </div>

                  <div className="row border-b-2 brc-default-l2"></div>
                  <div className="row mt-3">
                    <div className="col-12 col-sm-6 text-grey-m2 text-95 mt-2 mt-lg-0"></div>

                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                      <div className="row my-2">
                        <div className="col-5 text-right">SubTotal</div>
                        <div className="col-6">
                          <span className="text-120 text-secondary-d1">$2,250</span>
                        </div>
                      </div>

                      <div className="row my-2">
                        <div className="col-5 text-right">Tax (10%)</div>
                        <div className="col-6">
                          <span className="text-110 text-secondary-d1">$225</span>
                        </div>
                      </div>

                      <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                        <div className="col-5 text-right">Total Amount</div>
                        <div className="col-6">
                          <span className="text-150 text-success-d3 opacity-2">
                            {quote && quote.total_amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 text-grey-m2 text-95 mt-2 mt-lg-0">
                    {' '}
                    TOTAL : ONE THOUSAND SEVEN HUNDRED SEVEN ONLY{' '}
                  </div>
                  <span className="text-secondary-d1 text-105">Terms and Condition:-</span>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
