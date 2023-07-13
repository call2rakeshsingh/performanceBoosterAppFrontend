import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQQuestions() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  return (
    <div style={{marginTop:"50px", marginBottom: "100px"}}>
      <h1>FAQ</h1>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
        <AccordionSummary
          defaultExpanded = {true}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          What is Performance Booster App?
          </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Performance Booster App is a software, recently launched for the employees of this company. Where every employee can see all their basic details like pay slip, PF, ESIC etc. Also FMS users can fill their FMS and checklist here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Why we need Performance Booster App?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Complete information of every employee will be available here, so that every employee can access it anytime through user ID and password. You don't need to go HR for basic details or open multiple sheets and forms for FMS and Checklist. It is a one stop solution for all tasks.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          What is Dashboard Section?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          In initial days you were waiting for end of month for score but here you will see your live status in form of chart. The left one (Pi Chart) is showing your current month performance report and the right one (Bar chart) is showing your 6 months performance report.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}






// import React from "react";

// const FAQ = () => {
//   const FaqArr = [
//     {
//       Question: "What is Sona Internal?",
//       Answer:
//         "Sona Internal is a software, recently launched for the employees of Sona Papers. Where every employee can see all their basic details like pay slip, PF, ESIC etc. Also FMS users can fill their FMS and checklist here.",
//     },
//     {
//       Question: "Why we need Sona Internal Software?",
//       Answer:
//         "Complete information of every employee will be available here, so that every employee can access it anytime through user ID and password. You don't need to go HR for basic details or open multiple sheets and forms for FMS and Checklist. It is a one stop solution for all tasks.",
//     },
//     {
//       Question: "What is Dashboard Section?",
//       Answer:
//         "In initial days you were waiting for end of month for score but here you will see your live status in form of chart. The left one (Pi Chart) is showing your current month performance report and the right one (Bar chart) is showing your 6 months performance report.",
//     },
//   ];

//   return (
//     <>
//       <div
//         className="accordion mb-5"
//         id="accordionExample"
//         style={{ minHeight: "300px" }}
//       >
//         <h1 className="mb-2 mt-5 fw-bold" style={{color: "rgb(51, 51, 108)"}}>FAQ</h1>
//         {FaqArr.map((val, ind) => {
//           return (
//             <div className="accordion-item">
//               <h2 className="accordion-header" id={`heading${ind}`}>
//                 <button
//                   className="accordion-button"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target={`#collapse${ind}`}
//                   aria-expanded="true"
//                   aria-controls={`collapse${ind}`}
//                 >
//                   {val.Question}
//                 </button>
//               </h2>
//               <div
//                 id={`collapse${ind}`}
//                 className={`accordion-collapse collapse ${ind === 0 ? "show" : ""}`}
//                 aria-labelledby={`heading${ind}`}
//                 data-bs-parent="#accordionExample"
//               >
//                 <div className="accordion-body">
//                   {val.Answer}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default FAQ;



