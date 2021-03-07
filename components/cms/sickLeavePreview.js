import React, {Component} from 'react';

import html2canvas from "html2canvas";
import JsPdf from 'jspdf'

class SickLeavePreview extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new JsPdf();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  render() {

    const { clientName, visit_date,
      start_date, end_date, reason,
      technician_name
    } = this.props
    return (<div>
      <div className="sickLeavePreviewToolbar">
        <button onClick={this.printDocument}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
        </button>
      </div>
      <div className="sickLeavePreviewContainer">

        <div className="sickLeave" id="divToPrint">
          <div className="sickLeaveHeader">
            <div>Simson Health</div>
            <div>Telephone 2222 2222</div>
          </div>

          <hr/>
          <div className="sickLeaveBody">
            <p>
            To whom it may concern.
            This is to certify that {clientName} was
            examined by me on {visit_date}.
            As I was informed / based on an examination the patient
            referred to above will not be fit for his / her normal duties
            from {start_date} to {end_date} as a form of illness
            <br/>
            Reasons:
            <br/>
            {reason}
            </p>
          </div>
          <div className="sickLeaveFooter">
            <div className="sickLeaveFooterName">
              Signature: ___________
             <br/> Doctor: {technician_name}
            </div>
            <div className="sickLeaveFooterDate">
              Date: _______
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

SickLeavePreview.defaultProps = {
  clientName: '__________',
  visit_date: '__________',
  start_date: '__________',
  end_date: '__________',
  reason: '__________',
  technician_name: '__________'
}

export default SickLeavePreview

