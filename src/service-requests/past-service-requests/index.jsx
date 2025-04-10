import React, { useEffect, useState } from "react";
import PastRequestAccordion from "./PastRequestAccordion";
import { AllService } from "../../service/services";
import NoDataFound from "../../components/NoDataFound";
import ScreenLoading from "../../components/ScreenLoading";

const PastServiceRequests = () => {
  //constants

  //states
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [queryList, setQueryList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //methods
  const handleChange = (index) => () => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const fetchQueryData = async () => {
    setLoading(true);
    setError(null);
    const raisedBy = "GlTwSxksjHdPw0m1gDtWthVFwoj1";
    try {
      const response = await AllService.getQueryById(raisedBy);
      console.log("THIS IS RESPONSE", response);
      setQueryList(response || []);
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueryData();
  }, []);

  if (loading) {
    return <ScreenLoading />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (queryList.length === 0) {
    return <NoDataFound />;
  }
  return (
    <>
      {queryList.map((item, index) => (
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
