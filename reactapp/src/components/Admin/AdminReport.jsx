import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col,  Button } from "react-bootstrap";
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';
import './report.css';

// import "./report.css";
// ChartJS.register(
//     ArcElement,
//     Tooltip,
//     Legend
// );

function Report() {
    const [jobCount, setjobCount] = useState("");
    const [jobSeekerCount, setjobSeekerCount] = useState("");
    const [userCount, setuserCount] = useState("");
    const [expireJobs, setexpireJobs] = useState("");
    const [activeJobs, setactiveJobs] = useState("");
 

    useEffect(() => {
        getApiData();
    }, []);



    const getApiData = () => {
        axios
            .get('https://localhost:7065/api/admin/report', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                const api = result.data;
                if (api.length > 0) {
                    const api_data = api[0];
                    setjobCount(api_data.jobCount);
                    setjobSeekerCount(api_data.jobSeekerCount);
                    setuserCount(api_data.userCount);
                    setexpireJobs(api_data.expireJobs);
                    setactiveJobs(api_data.activeJobs);
                }
            })
            .catch((error) => {
                alert(error);
            });
    };


    // const pie_data = {
    //     labels : ['userCount', 'jobseekerCount', 'jobCount', 'expirejobs', 'activejobs'],
    //     datasets: [{
    //         data: [userCount, jobSeekerCount, jobCount, expireJobs, activeJobs],
    //         backgroundColor: ['black', 'blue', 'yellow', 'red', 'green'],
    //         borderColor: ['black'],
    //         color : ['black']
    //     }]
    // };

   
    const DownloadReport = () =>{

        const doc = new jsPDF();

        const borderWidth = 1;
        const borderColor = '#000';
        const headingFontSize = 24;
        const headingFontStyle = 'bold';
        const headingTextColor = '#007bff';
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        const x = borderWidth;
        const y = borderWidth;
        const width = pageWidth - borderWidth * 2;
        const height = pageHeight - borderWidth * 2;
        
        doc.setLineWidth(borderWidth);
        doc.setDrawColor(borderColor);
        doc.rect(x, y, width, height);
        
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(14);
        
        // Display date on the left side in dd-mm-yyyy format
        doc.text(`Date: ${formattedDate}`, 10, 50);
        
        const currentTime = new Date().toLocaleTimeString();
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(14);
        
        const timeTextWidth = doc.getStringUnitWidth(`Time: ${currentTime}`) * doc.internal.getFontSize();
        const timeX = pageWidth - timeTextWidth - 9;
        const timeY = 50;
        doc.text(`Time: ${currentTime}`, timeX, timeY, { align: 'right' });
        
        doc.setFontSize(14);
    
        const labels = [
            'userCount',
            'jobSeekerCount',
            'jobCount',
            'expireJobs',
            'activeJobs',
          
        ];
       
        const values = [
            userCount,
            jobSeekerCount,
            jobCount,
            expireJobs,
            activeJobs,
        ];
        
        const labelY = 70;
        const labelSpacing = 15;

        

labels.forEach((label, index) => {
  const labelNumber = `${index + 1}.`;
  const labelX = 10;
  const labelText = `${labelNumber} ${label}:`;
  doc.text(labelText, labelX, labelY + index * labelSpacing);

  const valueX = 60;
  const valueText = values[index] || '';
  const valueLine = `${valueText}  `;
  doc.text(valueLine, valueX, labelY + index * labelSpacing, { align: 'left', maxWidth: width - valueX - 10 });

  // ...
});

// ...

        doc.setFontSize(headingFontSize);
        doc.setFont(undefined, headingFontStyle);
        doc.setTextColor(headingTextColor);
        doc.text('Cook Hiring System - Report', pageWidth / 2, y + headingFontSize + 10, { align: 'center' });
        
        const lineY = y + headingFontSize + 15;
        
        doc.line(50, lineY, pageWidth - 50, lineY);
        
        // Add the pie chart image to the PDF
       
        
      const footerText = 'Dear Admin: ';
      const footerContent = 'We believe on your expertise and vigilance in upholding data protection protocols, guaranteeing a secure environment for our platform and its users.';
      const footerX = 10;
      const footerY = pageHeight - 30;
      const footerWidth = pageWidth - 20;
      
      doc.setFontSize(14); // Increased the text size to 14
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.setFont('italic');
      doc.text(footerText, footerX, footerY);
      doc.setFontSize(12); // Reset the text size to 12
      doc.setFont('normal');
      doc.text(footerContent, footerX, footerY + 10, { maxWidth: footerWidth });
       doc.save('CookHiring_Report.pdf');
    

      }
    //   canvas



    return (
        <div className="Report_head">
            <h1>Cooking Reports</h1>
            <div style={{display:'flex'}}>
            <div>
            <Container>
            <h2><b>Data</b></h2>
                        <div className="Report_body" >
                            <Row className="Report_row ">
                                <Col >
                                    <strong>1. Total Users </strong>
                                </Col>
                                <Col>
                                <strong>: </strong>
                                <b>&nbsp;&nbsp;{jobCount}</b>
                                </Col>
                            </Row>
                            <Row className="Report_row">
                                <Col >
                                    <strong>2. Total JobSeekers </strong>
                                </Col>
                                <Col>
                                    <strong>: </strong>
                                    <b>&nbsp;&nbsp;{jobSeekerCount}</b>
                                </Col>
                            </Row>
                            <Row className="Report_row">
                                <Col >
                                    <strong>3. Total Posted Jobs</strong>
                                </Col>
                                <Col>
                                    <strong>: </strong>
                                    <b>&nbsp;&nbsp;{jobCount}</b>
                                </Col>
                            </Row>
                            <Row className="Report_row">
                                <Col >
                                    <strong>4. Expired Jobs</strong>
                                </Col>
                                <Col>
                                    <strong>: </strong>
                                    <b>&nbsp;&nbsp;{expireJobs}</b>
                                </Col>
                            </Row>
                            <Row className="Report_row">
                                <Col >
                                    <strong>5. Active Jobs</strong>
                                </Col>
                                <Col>
                                    <strong>: </strong>
                                    <b>&nbsp;&nbsp;{activeJobs}</b>
                                </Col>
                            </Row>
                        </div>
            </Container>
            </div>
            {/* <div className="piechart" >
                <h2 > Pie Chart</h2>
                <center><Doughnut data={pie_data}  ></Doughnut></center>
            </div> */}
            
            </div>
            <br/>
            <center><Button  className="report_btn" onClick={DownloadReport}>Download</Button></center>
        </div >
    );
}


export default Report;
