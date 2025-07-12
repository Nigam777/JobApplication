import React from "react";
import { Divider, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import { companyData } from "../Data/Company";
import SimilarCompany from "../CompanyProfile/SimilarCompany";



const CompanyPages= () => {
  const navigate=useNavigate();
  return (
    <>
      <div>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
          <Divider size="sm" mx="md" />
         
            <Button
            my="md"
            mx='md'
            onClick={()=>navigate(-1)}
              leftSection={<IconArrowLeft />}
              variant="outline"
              color="brightSun.4"
              size="sm"

            >
              {" "}
              Back
            </Button>
       

          <Divider size="sm" mx="md" />

          <div className="flex ">
          <CompanyProfile  {...companyData} />

<SimilarCompany/>
          </div>
         
        </div>
        
      </div>
    </>
  );
};

export default CompanyPages;