/* eslint-disable @next/next/no-img-element */
import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiCalendar, HiLocationMarker } from "react-icons/hi";
import SolidButton from "../components/buttons/solidButton";
import PrimaryCard from "../components/cards/primaryCard";
import JobsFilter from "../components/filter/jobsFilter";
import NavBar from "../components/layout/navBar";
import CreateProposalModal from "../components/modals/createProposal";
import { auth } from "../lib/firebase";
import {
  getFreelancerStats,
  getJobs,
  getJobsByFilters,
  getProposals,
} from "../services/jobs";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user] = useAuthState(auth);
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [selectedJob, setSelectedJob] = useState();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    jobsDone: 0,
    clientsWorkedWith: 0,
  });

  useEffect(() => {
    setLoading(true);
    getJobs()
      .then((data) => setJobs(data))
      .then(() =>
        getProposals({ uid: user.uid }).then((data) => setProposals(data))
      )
      .then(() =>
        getFreelancerStats({ uid: user.uid }).then((data) =>
          setStatistics(data)
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  function filterPaymentsHandler(values) {
    console.log(values);
    setLoading(true);
    getJobsByFilters(values)
      .then((data) => setJobs(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <CreateProposalModal
        isOpen={isOpen}
        onClose={onClose}
        job={selectedJob}
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
        {loading == false && (
          <div className="flex gap-4 w-1/2">
            <PrimaryCard
              value={statistics.jobsDone}
              description={"Jobs Done"}
            />
            <PrimaryCard
              value={statistics.clientsWorkedWith}
              description={"Clients Worked For"}
            />
          </div>
        )}
        <JobsFilter filterPaymentsHandler={filterPaymentsHandler} />
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {jobs.map((job, i) => (
              <li key={i}>
                <div className="px-4 py-4 sm:px-6 space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={"/images/profile.png"}
                          alt=""
                        />
                      </div>
                      <p className="font-medium">{job.companyName}</p>
                    </div>
                    {/* Checking if the freelancer has already made a proposal for
                    this job. If they have, do not show the create proposal button */}
                    {!proposals.map((e) => e.jobId).includes(job.id) ? (
                      <div className="w-fit">
                        <SolidButton
                          label={"Create Proposal"}
                          onClick={() => {
                            setSelectedJob(job);
                            onOpen();
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <p
                          className={`${
                            proposals.find((e) => e.jobId == job.id).status ==
                            "rejected"
                              ? "bg-red-400"
                              : proposals.find((e) => e.jobId == job.id)
                                  .status == "accepted"
                              ? "bg-green-400"
                              : "bg-soko-blue"
                          } px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full  text-white capitalize`}
                        >
                          {proposals.find((e) => e.jobId == job.id).status}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold  truncate">
                      {job.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {job.type}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {job.brief.substring(0, 250)}...
                  </p>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <HiLocationMarker
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {job.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <HiCalendar
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        Closing on{" "}
                        {moment(job.deadline)
                          .local()
                          .format("DD MMM YYYY HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

Page.auth = true;
Page.userType = "freelancer";
Page.layout = NavBar;
