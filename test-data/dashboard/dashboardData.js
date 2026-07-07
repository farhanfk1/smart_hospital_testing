const { allIncomeCards,
  doctorCards,
  receptionistCards,
  pharmacistCards,
  pathologistCards,
  radiologistCards,
  accountantCards,
  noDashboardCards,
       
 } = require("./dashboardCards");

const { fullGraphs,
  calendarGraph,
} = require("./dashboardGraphs");

const {
  commonStaffCards,
  noStaffCards,
} = require("./staffCards")



module.exports = {
  "Super Admin": {
    cards: allIncomeCards,
    graphs: fullGraphs,
    staffCards: commonStaffCards,
  },
  Admin: {
    cards: allIncomeCards,
    graphs: fullGraphs,
    staffCards: commonStaffCards
  },
  Doctor: {
    cards: doctorCards,
    graphs: calendarGraph,
    staffCards: commonStaffCards,
  },
  Pharmacist: {
    cards: pharmacistCards,
    graphs: calendarGraph,
    staffCards: commonStaffCards,
  },
  Pathologist: {
    cards: pathologistCards,
    graphs: calendarGraph,
    staffCards: noStaffCards,
  },
  Radiologist: {
    cards: radiologistCards,
    graphs: calendarGraph,
    staffCards: commonStaffCards,
  },
  Accountant: {
    cards: accountantCards,
    graphs: fullGraphs,
    staffCards: commonStaffCards,
  },
  Receptionist: {
    cards: receptionistCards,
    graphs: calendarGraph,
    staffCards: commonStaffCards,
  },
  Nurse: {
    cards: noDashboardCards,
    graphs: calendarGraph,
    staffCards: commonStaffCards,
  },
};
