import data from "./database.json";
import { IncomingMessage, ServerResponse } from "http";
import { organ, writeData, generateId } from "./utility";

//Promise that returns the data in database.json
function getData() {
  return new Promise((resolve) => {
    resolve(data);
  });
}

//Reads input from the body, converts the buffer to string and stores said data in the variable body
function readBody(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body: string = "";
      req
        .on("data", (buffer) => (body += buffer.toString()))
        .on("end", () => {
          resolve(body);
        });
    } catch (err) {
      reject(err);
    }
  });
}

//Helps create a new organisation and writes data to database.json
function create(org: organ) {
  return new Promise((resolve) => {
    const newOrg = { id: generateId(), ...org };
    data.push(newOrg);
    writeData("./server/database.json", data);
    resolve(newOrg);
  });
}

//Returns an organisation with a specific id
function findById(id: number) {
  return new Promise((resolve) => {
    const org = data.find((o) => o.id === id);
    resolve(org);
  });
}

//Edits the various fields of an organisation and writes to database.json
function edit(id: number, org: organ) {
  return new Promise((resolve) => {
    const index = data.findIndex((o) => o.id === id);
    data[index] = { id, ...org };
    writeData("./server/database.json", data);
    resolve(data[index]);
  });
}

//Deletes an organisation with the matching id
function delOrg(id: number) {
  return new Promise((resolve) => {
    const index = data.findIndex((o) => o.id === id);
    data.splice(index, 1);
    writeData("./server/database.json", data);
    resolve(data);
  });
}

export { getData, readBody, create, findById, edit, delOrg };
