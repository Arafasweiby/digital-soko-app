import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import _ from "lodash";
import { db } from "../lib/firebase";

export async function createJob({ data }) {
  await addDoc(collection(db, "jobs"), data);
}

export async function createProposal({ jobId, data }) {
  await addDoc(collection(db, "proposals"), data);
  await updateDoc(doc(db, "jobs", jobId), { proposalCount: increment(1) });
}

export async function updateProposal({ data, id }) {
  await setDoc(doc(db, "proposals", id), data, { merge: true });
}

export async function getProposalsByJob({ jobId }) {
  const q = query(collection(db, "proposals"), where("jobId", "==", jobId));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export async function getJobs() {
  const q = query(collection(db, "jobs"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export async function getJobsByFilters(values) {
  var queries = [];
  if (values.type != "") queries.push(where("type", "==", values.type));
  if (values.location != "")
    queries.push(where("location", "==", values.location));
  if (values.experience != "")
    queries.push(where("experience", "==", values.experience));
  const q = query(collection(db, "jobs"), ...queries);
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export async function getProposals({ uid }) {
  const q = query(
    collection(db, "proposals"),
    where("freelancerUid", "==", uid)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export async function getJobsByClient({ uid }) {
  const q = query(collection(db, "jobs"), where("companyId", "==", uid));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export async function getClientStats({ uid }) {
  let data = { jobsPosted: 0, freelancersHired: 0 };

  let q = query(collection(db, "jobs"), where("companyId", "==", uid));
  let querySnapshot = await getDocs(q);
  data.jobsPosted = querySnapshot.size;

  q = query(collection(db, "proposals"), where("companyId", "==", uid));
  querySnapshot = await getDocs(q);
  let temp = [];
  querySnapshot.forEach((doc) => {
    temp.push(doc.freelancerUid);
  });
  data.freelancersHired = _.uniq(temp).length;
  return data;
}

export async function getFreelancerStats({ uid }) {
  let data = { jobsDone: 0, clientsWorkedWith: 0 };

  let q = query(
    collection(db, "proposals"),
    where("freelancerUid", "==", uid),
    where("status", "==", "accepted")
  );
  let querySnapshot = await getDocs(q);
  data.jobsDone = querySnapshot.size;

  q = query(collection(db, "proposals"), where("freelancerUid", "==", uid));
  querySnapshot = await getDocs(q);
  let temp = [];
  querySnapshot.forEach((doc) => {
    temp.push(doc.companyId);
  });
  data.clientsWorkedWith = _.uniq(temp).length;
  return data;
}

export async function deleteJob({ id }) {
  await deleteDoc(doc(db, "jobs", id));
}
