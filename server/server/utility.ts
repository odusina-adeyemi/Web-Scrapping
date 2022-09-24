import fs from "fs";
import data from "./database.json";

//An interface for the organisations
interface organ {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

//Uses th fs module to write data to a specific path
function writeData(file: string, content: unknown) {
  fs.writeFile(file, JSON.stringify(content, null, 2), "utf8", (err) => {
    err ? console.log(err) : null;
  });
}

//Generates an Id for organisations being created
function generateId() {
  let id;
  data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
  return id;
}

export { organ, writeData, generateId };
