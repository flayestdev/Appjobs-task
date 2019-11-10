class Condidate {
  constructor(name, fulfilled) {
    this.name = name;
    this.fulfilled = fulfilled;
    this.eligibleCompanies = [];
    this.nonEligibleCompanies = [];

    // check fulfiled and unfulfiled companies at instanciation
    this.checkIfImElgible();
  }

  // get All fulfiled and unfulfild companies and set them to the according properties
  checkIfImElgible() {
    this.eligibleCompanies = Company.getAllFulfildCompanies(this);
    this.nonEligibleCompanies = Company.getAllNotFulfildCompanies(this);
  }
}

class Company {
  constructor(name, condition) {
    this.name = name;
    this.condition = condition;

    Company.companies.push(this);
  }

  static companies = [];

  static checkFulfilment(condidate, company) {
    //Check if there is no condition
    if (
      typeof company.condition === "string" &&
      company.condition.length === 0
    ) {
      return true;
    }

    //split the condition to an array
    let builCondition = company.condition.split(" ");

    // map thru the array's condition for true values
    builCondition = builCondition.map(el => {
      for (const condF in condidate.fulfilled) {
        if (el.includes(condF) && condidate.fulfilled[condF]) {
          el = true.toString();
        }
      }
      return el;
    });

    // map thru the array's condition for false values
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

  static getAllFulfildCompanies(condidate) {
    // Filter all companies and return only companies that the condidate
    //fulfild their requirements
    let fulfiedCompanies = this.companies.filter(company => {
      return this.checkFulfilment(condidate, company) === true;
    });

    return fulfiedCompanies;
  }

  static getAllNotFulfildCompanies(condidate) {
    // Filter all companies and return only companies that the condidate
    // didn't fulfild their requirements
    let notFulfiedCompanies = this.companies.filter(company => {
      return this.checkFulfilment(condidate, company) === false;
    });

    return notFulfiedCompanies;
  }
}

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

const ilyes = new Condidate("ilyes", {
  house: true,
  bike: false,
  sSecurity: true,
  workPermit: true,
  house: true
});

let value;

value = Company.checkFulfilment(ilyes, compnayA);
