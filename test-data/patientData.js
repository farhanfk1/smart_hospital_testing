module.exports = () => {
  const unique = Date.now() + Math.floor(Math.random() * 10000);

  return {
    name: `Ali ${unique}`,
    gender: "Male",
    dateOfBirth: "10/03/2003",
    phone: `03${String(unique).slice(-9)}`,
    email: `ali${unique}@example.com`,
    guardianName: "Ahmed Khan",
    bloodGroup: "A+",
    maritalStatus: "Single",
    patientPhoto: "test-data/files/patient.png",
    address: "University Road, Peshawar",
    remarks: "Patient is in good health.",
    anyKnownAllergies: "Penicillin",
    tpa: "Raksha Health Insurance",
    tpaId: `TPA${unique}`,
    tpaValidity: "7/7/2027",
    nationalIdentificationNumber: `17301${String(unique).slice(-7)}`,
    alternateNumber: `03${String(unique + 1).slice(-9)}`,
  };
};
