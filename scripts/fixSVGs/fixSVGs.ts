import * as fs from "fs";
import * as glob from "glob";
// Find all files ending with .svg
const svgFiles = glob.sync("./src/**/*.svg");
// For each SVG file
svgFiles.forEach((svgFile) => {
  // Read the file as a string
  var svgString = fs.readFileSync(svgFile, "utf8");
  // get every xml tag in file
  const xmlTags = svgString.match(/<[^>]+>/g);
  // for each xml tag
  xmlTags &&
    xmlTags.forEach((xmlTag) => {
      // if tag includes a colon
      if (xmlTag.includes(":")) {
        // set letter infront of colon to uppercase
        const tag = xmlTag.replace(/:(.*)/, (match, p1) => {
          return `:${p1.toUpperCase()}`;
        });
        // replace xml tag in file with new tag
        svgString = svgString.replace(xmlTag, tag);
      }
    });

  // write new file with fixed svg
  fs.writeFileSync(svgFile, svgString);
});
