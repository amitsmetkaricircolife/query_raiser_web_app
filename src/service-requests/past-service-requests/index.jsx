import React, { useEffect, useState } from "react";
import PastRequestAccordion from "./PastRequestAccordion";
import { AllService } from "../../service/services";

const PastServiceRequests = () => {
  //constants

  //states
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [queryList, setQueryList] = useState([]);

  //methods
  const handleChange = (index) => () => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const fetchQueryData = async () => {
    const raisedBy = "GlTwSxksjHdPw0m1gDtWthVFwoj1";
    try {
      const response = await AllService.getQueryById(raisedBy);
      console.log("THIS IS RESPONSE", response);
      setQueryList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueryData();
  }, []);
  return (
    <>
      {queryList?.map((item, index) => (
        <PastRequestAccordion
          key={index}
          device={item.device}
          postedDate={new Date(item.TimeStamp).toLocaleDateString()}
          status={item.queryStatus}
          issue={item.subject}
          address={item.address}
          description={item.summery}
          contactPerson={item.contactperson}
          contactNumber={item.contactnumber}
          expanded={expandedIndex === index}
          onChange={handleChange(index)}
        />
      ))}
    </>
  );
};

export default PastServiceRequests;
