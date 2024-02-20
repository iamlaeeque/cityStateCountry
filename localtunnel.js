// localtunnel.js
const localtunnel = require("localtunnel");

const tunnel = localtunnel(
  { port: 3000, subdomain: "laeeque" },
  (err, tunnel) => {
    if (err) {
      console.error("Error creating localtunnel:", err);
    } else {
      console.log("localtunnel URL:", tunnel.url);
    }
  }
);

tunnel.on("close", () => {
  console.log("localtunnel closed");
});
