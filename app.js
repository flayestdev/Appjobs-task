// Condition statement should all follow this format: 
// "( ( house || inssurance ) ) && bike" 
// space between all operands and logical operators

class Candidate {
  constructor(name, fulfilled) {
    this.name = name;
    this.fulfilled = fulfilled;
    this.eligibleCompanies = [];
    this.notEligibleCompanies = [];

    // check fulfilled and unfulfilled companies at instantiation
    this.checkIfImElgible();
  }

  // get All fulfilled and unfulfilled companies and set them to the according properties
  checkIfImElgible() {
    this.eligibleCompanies = Company.getAllFulfilledCompanies(this);
    this.notEligibleCompanies = Company.getAllUnfulfilledCompanies(this);
  }
}

class Company {
  constructor(name, condition) {
    this.name = name;
    this.condition = condition;

    // add the instantiated company to companies List
    Company.companies.push(this);
  }

  static companies = [];

  static checkFulfilment(candidate, company) {

    //Check if there is no condition and validate the statement
    if (
      typeof company.condition === "string" &&
      company.condition.length === 0
    ) {
      return true;
    }

    // Split the condition to an array
    let builCondition = company.condition.split(" ");

    // map through the array's condition for true values
    builCondition = builCondition.map(el => {
      for (const condF in candidate.fulfilled) {
        if (el.includes(condF) && candidate.fulfilled[condF]) {
          el = true.toString();
        }
      }
      return el;
    });

    // map through the array's condition for false values
    builCondition = builCondition.map(el => {
      if (
        !el.includes("(") &&
        !el.includes(")") &&
        !el.includes("&&") &&
        !el.includes("||") &&
        !el.includes("true")
      ) {
        el = false.toString();
      }

      return el;
    });

    // Evaluate the condition and return the value
    return eval(builCondition.join(" "));
  }

  static getAllFulfilledCompanies(candidate) {
    
    // Filter all companies and return only companies that the candidate
    //fulfilled their requirements
    let fulfiedCompanies = this.companies.filter(company => {
      return this.checkFulfilment(candidate, company) === true;
    });

    return fulfiedCompanies;
  }

  static getAllUnfulfilledCompanies(candidate) {

    // Filter all companies and return only companies that the candidate
    // didn't fulfilled their requirements
    let notFulfiedCompanies = this.companies.filter(company => {
      return this.checkFulfilment(candidate, company) === false;
    });

    return notFulfiedCompanies;
  }
}


// Demo

//  instantiated some companies for a Demo purpose
const compnayA = new Company(
  "Company A",
  "( ( house || inssurance ) ) && bike"
);

const compnayB = new Company("Company B", "( sSecurity && workPermit )");

const companyF = new Company(
  "Company F",
  "scooter || bike || ( motorcycle && driverLiscense && motorcycleInsurance )"
);

const companyJ = new Company("Company J", "");

const AppJobs = new Company("App Jobs", "( react && javascript ) && ( git || bash )");


// instantiated a candidate
const ilyes = new Candidate("Ilyes", {
  house: true,
  bike: true,
  sSecurity: true,
  workPermit: false,
  house: true
});


// Check the values of "Ilyes" Candidate
console.log(ilyes);
