const allIncomeCards = [
  {
    name: "OPD Income",
    url: "/admin/patient/search",
  },
  {
    name: "IPD Income",
    url: "/admin/patient/ipdsearch",
  },
  {
    name: "Pharmacy Income",
    url: "/admin/pharmacy/bill",
  },
  {
    name: "Pathology Income",
    url: "/admin/pathology/gettestreportbatch",
  },
  {
    name: "Radiology Income",
    url: "/admin/radio/gettestreportbatch",
  },
  {
    name: "Blood Bank Income",
    url: "/admin/bloodbank/issue",
  },
  {
    name: "Ambulance Income",
    url: "/admin/vehicle/getcallambulance",
  },
  {
    name: "General Income",
    url: "/admin/income",
  },
  {
    name: "Expense",
    url: "/admin/expense",
  },
];

const doctorCards = [
  {
    name: "IPD Income",
    url: "/admin/patient/ipdsearch",
  },
];

const receptionistCards = [
  {
    name: "OPD Income",
    url: "/admin/patient/search",
  },
  {
    name: "IPD Income",
    url: "/admin/patient/ipdsearch",
  },
];

const pharmacistCards = [
  {
    name: "Pharmacy Income",
    url: "/admin/pharmacy/bill",
  },
];

const pathologistCards = [
  {
    name: "Pathology Income",
    url: "/admin/pathology/gettestreportbatch",
  },
];

const radiologistCards = [
  {
    name: "Radiology Income",
    url: "/admin/radio/gettestreportbatch",
  },
];

const accountantCards = [
  {
    name: "OPD Income",
    url: "/admin/patient/search",
  },
  {
    name: "IPD Income",
    url: "/admin/patient/ipdsearch",
  },
  {
    name: "Pharmacy Income",
    url: "/admin/pharmacy/bill",
  },
  {
    name: "Radiology Income",
    url: "/admin/radio/gettestreportbatch",
  },
  {
    name: "Blood Bank Income",
    url: "/admin/bloodbank/issue",
  },
  {
    name: "Ambulance Income",
    url: "/admin/vehicle/getcallambulance",
  },
  {
    name: "General Income",
    url: "/admin/income",
  },
  {
    name: "Expense",
    url: "/admin/expense",
  },
];
const noDashboardCards = [];

module.exports = {
  allIncomeCards,
  doctorCards,
  receptionistCards,
  pharmacistCards,
  pathologistCards,
  radiologistCards,
  accountantCards,
  noDashboardCards
};
