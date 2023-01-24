import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SolidButton from "../components/buttons/solidButton";
import PrimaryCard from "../components/cards/primaryCard";
import JobsFilter from "../components/filter/jobsFilter";
import NavBar from "../components/layout/navBar";
import CreateJobModal from "../components/modals/createJobModal";
import ClientJobsTable from "../components/tables/clientJobsTable";
import { auth } from "../lib/firebase";
import { getClientStats, getJobsByClient } from "../services/jobs";
import { clientJobsColumns } from "../utils/constants";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [queryParameters, setQueryParameters] = useState({});
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    jobsPosted: 0,
    freelancersHired: 0,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    getJobsByClient({ uid: user.uid })
      .then((data) => setData(data))
      .then(() =>
        getClientStats({ uid: user.uid }).then((data) => setStatistics(data))
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user.uid, queryParameters]);

  const reloadData = () => {
    setQueryParameters((prevState) => ({ ...prevState, reload: true }));
  };

  return (
    <>
      <CreateJobModal
        isOpen={isOpen}
        onClose={onClose}
        reloadDataHandler={reloadData}
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-8 space-y-8">
        <div className="flex items-center">
          <h2 className="text-2xl font-extrabold text-lipad-black">Jobs</h2>
          <div className="ml-auto w-48">
            <SolidButton
              label="Create Job"
              onClick={() => {
                localStorage.removeItem("clientJob");
                onOpen();
              }}
            />
          </div>
        </div>
        {loading == false && (
          <div className="flex gap-4 w-1/2">
            <PrimaryCard
              value={statistics.jobsPosted}
              description={"Jobs Posted"}
            />
            <PrimaryCard
              value={statistics.freelancersHired}
              description={"Freelancers Hired"}
            />
          </div>
        )}
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <ClientJobsTable
            data={data}
            columns={clientJobsColumns}
            reloadDataHandler={reloadData}
            updateDataHandler={onOpen}
          />
        )}
      </div>
    </>
  );
}

Page.auth = true;
Page.layout = NavBar;
