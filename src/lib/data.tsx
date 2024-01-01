export let navList = [
  {
    name: "Pricing",
    href: "/",
  },
  {
    name: "Client Area",
    href: "/client",
  },
];

export const Plans = [
  "Budget Residential",
  "Premium Residential",
  "Premium LTE",
  "Mobile LTE",
];

export let countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
];

let Mobile_LTE_Features = [
  "ATT ISP",
  "Unlimited Threads",
  "Rotation once per 30 minutes",
  "Only IP Auth",
  "USA IPs",
  "One port, which rotates ip every 30 minutes",
];
export const Mobile_LTE_Data = [
  {
    price: 6,
    size: 1,
    note: "Per 1 Day of access",
    features: Mobile_LTE_Features,
  },
  {
    price: 35,
    size: 7,
    note: "Per 1 Week of access",
    features: Mobile_LTE_Features,
  },
];

let Residential_Features = [
  "20.000.000+ IP Pool",
  "Unlimited Threads",
  "Premium Support",
  "Only user:pass auth",
  "Country/State/City Targetting Available",
  "Rotating/Sticky Sessions",
];

export const Residential_Data = [
  {
    price: 5,
    size: 1,
    note: "Per 1 GB of data",
    features: Residential_Features,
  },
  {
    price: 10,
    size: 2,
    note: "Per 2 GB of data",
    features: Residential_Features,
  },
  {
    price: 24,
    size: 5,
    note: "Per 5 GB of data",
    features: Residential_Features,
  },
  {
    price: 110,
    size: 25,
    note: "Per 25 GB of data",
    features: Residential_Features,
  },
];
