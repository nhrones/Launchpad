// deno-lint-ignore-file
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// deno:file:///C:/Users/nhron/dev/PWA/Launchpad/src/dom.ts
var source;
var tool;
var output;
var launchButton;
var destination;
var port;
function init() {
  if (isDesktop()) {
    window.moveTo(1, 1);
    let width = 500;
    let height = 325;
    window.resizeTo(width, height);
  }
  port = document.getElementById("port");
  source = document.getElementById("srcfolder");
  destination = document.getElementById("destfolder");
  tool = document.getElementById("tool");
  output = document.getElementById("output");
  launchButton = document.getElementById("launchbtn");
}
__name(init, "init");
function isDesktop() {
  return !matchMedia("(display-mode: browser)").matches;
}
__name(isDesktop, "isDesktop");

// deno:file:///C:/Users/nhron/dev/PWA/Launchpad/src/main.ts
if ("serviceWorker" in navigator) {
}
var portNum = 80;
init();
launchButton.addEventListener("click", () => {
  const sourceFolder = source.value;
  console.log("sourceFolder ", sourceFolder);
  const destFolder = destination.value;
  const toolName = tool.value;
  portNum = parseInt(port.value);
  let parms = {};
  switch (toolName) {
    case "serve":
      output.value = `Serving /${destFolder}/index.html`;
      parms = { folder: destFolder, port: portNum };
      break;
    case "hot":
      output.value = `Hot-Serve /${destFolder}/index.html`;
      parms = { srcfolder: sourceFolder, destination: destFolder, port: portNum };
      break;
    case "build":
      output.value = `Building /${sourceFolder}/main.ts to /${destFolder}/bundle.js`;
      parms = { destination: destFolder, minify: "--nomin" };
      break;
    case "log":
      output.value = `Logger started on port:${portNum} `;
      parms = { port: portNum };
      break;
    default:
      output.value = "What?";
      break;
  }
  fetch("", {
    method: "POST",
    body: JSON.stringify(
      {
        msgID: 99,
        toolName,
        params: parms
      }
    )
  });
});
