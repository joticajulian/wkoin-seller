function log(msg) {
  if(typeof msg === "object") {
    console.log(`${new Date().toISOString()} |`);
    console.log(msg);
  }

  console.log(`${new Date().toISOString()}: ${msg}`);
}

module.exports = { log };