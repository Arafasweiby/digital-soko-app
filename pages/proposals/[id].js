/* eslint-disable @next/next/no-img-element */
import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  HiBell,
  HiCheckCircle,
  HiChevronRight,
  HiMail,
  HiXCircle,
} from "react-icons/hi";
import NavBar from "../../components/layout/navBar";
import ViewProposalModal from "../../components/modals/viewProposal";
import { getProposalsByJob } from "../../services/jobs";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [queryParameters, setQueryParameters] = useState({});
  const [selectedProposal, setSelectedProposal] = useState();

  useEffect(() => {
    setLoading(true);
    getProposalsByJob({ jobId: router.query.id })
      .then((data) => setData(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [router.query.id, queryParameters]);

  const reloadData = () => {
    setQueryParameters((prevState) => ({ ...prevState, reload: true }));
  };

  return (
    <>
      <ViewProposalModal
        isOpen={isOpen}
        onClose={onClose}
        proposal={selectedProposal}
        reloadDataHandler={reloadData}
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-8 space-y-8">
        <div className="flex items-center">
          <h2 className="text-2xl font-extrabold text-lipad-black">
            Proposals
          </h2>
        </div>
        {loading ? (
          <p>Loading proposals...</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {data.map((proposal, i) => (
                <li key={i}>
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={
                            proposal.freelancerPhotoUrl ?? "/images/profile.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {proposal.freelancerName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <HiMail
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {proposal.freelancerEmail}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on{" "}
                              {moment(proposal.applicationDate)
                                .local()
                                .format("DD MMM YYYY HH:mm")}
                            </p>
                            {proposal.status === "pending" && (
                              <p className="mt-2 flex items-center text-sm capitalize text-blue-600">
                                <HiBell
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 "
                                  aria-hidden="true"
                                />
                                {proposal.status}
                              </p>
                            )}
                            {proposal.status === "accepted" && (
                              <p className="mt-2 flex items-center text-sm capitalize text-green-600">
                                <HiCheckCircle
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 "
                                  aria-hidden="true"
                                />
                                {proposal.status}
                              </p>
                            )}
                            {proposal.status === "rejected" && (
                              <p className="mt-2 flex items-center text-sm capitalize text-red-600">
                                <HiXCircle
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 "
                                  aria-hidden="true"
                                />
                                {proposal.status}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSelectedProposal(proposal);
                          onOpen();
                        }}
                      >
                        <HiChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

Page.auth = true;
Page.layout = NavBar;
