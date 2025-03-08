const fs = require("fs");

// Read and parse the JSON file
const filePath = "third-party-licenses-direct-overview.json";
const rawData = fs.readFileSync(filePath, "utf8");
const licenses = JSON.parse(rawData);

// Function to extract formatted package details
function formatLicenses(data) {
  const tableHeader =
    "| Reference | Version | License Type | License URL |\n|-----------|---------|--------------|-------------|";
  const tableRows = Object.entries(data).map(([key, value]) => {
    const [reference, version] = key.split("@").filter(Boolean);
    const licenseType = value.licenses || "Unknown";
    const licenseUrl = value.licenseUrl || "N/A";
    return `| ${reference} | ${version} | ${licenseType} | ${licenseUrl} |`;
  });

  return [tableHeader, ...tableRows].join("\n");
}

// Generate the formatted output
const formattedTable = formatLicenses(licenses);

// Write to a file (or console log)
console.log(formattedTable);
//fs.writeFileSync("formatted-licenses.md", formattedTable);
//console.log("✅ License summary saved to formatted-licenses.md");
