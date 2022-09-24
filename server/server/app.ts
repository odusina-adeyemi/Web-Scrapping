import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getOrgs, createOrg, editOrg, deleteOrg } from "./controllers";
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const id: number = Number(req.url?.split("/")[2]);
    if (req.method === "GET" && req.url === "/companies") {
      getOrgs(req, res);
    } else if (req.method === "POST" && req.url === "/companies") {
      createOrg(req, res);
    } else if (
      req.url?.match(/\/companies\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      editOrg(req, res, id);
    } else if (
      req.url?.match(/\/companies\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      deleteOrg(req, res, id);
    } else {
      res
        .writeHead(400, { "Content-Type": "application/json" })
        .end(JSON.stringify({ alert: "Route Unavailable" }));
    }
  }
);

server.listen(3005, () => console.log(`Port Running`));
