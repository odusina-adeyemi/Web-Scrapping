import { IncomingMessage, ServerResponse } from "http";
import { getData, readBody, create, findById, edit, delOrg } from "./model";
import { organ } from "./utility";

//Get all data from database.json
async function getOrgs(req: IncomingMessage, res: ServerResponse) {
  try {
    const companies = await getData();

    res
      .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify(companies, null, ""));
  } catch (err) {
    console.log(err);
  }
}

//Creates a new organisation with it's corresponding data
async function createOrg(req: IncomingMessage, res: ServerResponse) {
  try {
    const data = await readBody(req);
    const newData: string = String(data);
    const {
      organization,
      createdAt,
      updatedAt,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    } = JSON.parse(newData);

    const org: organ = {
      organization,
      createdAt,
      updatedAt,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    };

    const newOrg = await create(org);

    return res
      .writeHead(201, { "Content-Type": "Application/json" })
      .end(JSON.stringify(newOrg));
  } catch (err) {
    console.log(err);
  }
}

//Edits the various fields of an organisation
async function editOrg(req: IncomingMessage, res: ServerResponse, id: number) {
  try {
    const org = await findById(id);

    if (!org) {
      res
        .writeHead(404, { "Conten-Type": "application/json" })
        .end(JSON.stringify({ alert: "Organisation Not Found" }));
    } else {
      const data = await readBody(req);
      const newData = String(data);
      const {
        organization,
        createdAt,
        updatedAt,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(newData);

      const orgInfo: organ = {
        organization: organization,
        createdAt: createdAt,
        updatedAt: updatedAt,
        products: products,
        marketValue: marketValue,
        address: address,
        ceo: ceo,
        country: country,
        noOfEmployees: noOfEmployees,
        employees: employees,
      };

      const modOrg = await edit(id, orgInfo);

      return res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(modOrg));
    }
  } catch (err) {
    console.log(err);
  }
}

//Deletes an organisation and it's corresponding data
async function deleteOrg(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const org = await findById(id);

    if (!org) {
      res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({ alert: "Organisation Not Found" }));
    } else {
      await delOrg(id);
      res.writeHead(200, { "Content-Type": "application/json" }).end(
        JSON.stringify({
          alert: `Organisation with id ${id} has been deleted`,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export { getOrgs, createOrg, editOrg, deleteOrg };
