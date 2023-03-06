/// <reference lib="dom" />

import {
   destination,
   init,
   launchButton,
   output,
   port,
   source,
   tool,
} from './dom.ts'

if ('serviceWorker' in navigator) {
   //navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

let portNum = 80 // default = 90

init()

launchButton.addEventListener('click', () => {
   const sourceFolder = source.value;
   console.log('sourceFolder ', sourceFolder)
   const destFolder = destination.value;
   const toolName = tool.value;
   portNum = parseInt(port.value)
   
   let parms: any = {}
   
   switch (toolName) {
      case "serve":
         output.value = `Serving /${destFolder}/index.html`;
         parms = {folder: destFolder, port: portNum };
         break;
         
      case "hot":
         output.value = `Hot-Serve /${destFolder}/index.html`;
         parms = {srcfolder: sourceFolder, destination: destFolder, port: portNum };
         break;

      case "build":
         output.value = `Building /${sourceFolder}/main.ts to /${destFolder}/bundle.js`;
         parms = {destination: destFolder, minify: "--nomin" };
         break;

      case "log":
         output.value = `Logger started on port:${portNum} `;
         parms = {port: portNum};
         break;

      default:
         output.value = "What?"
         break;
   }
   
   fetch("", {
      method: "POST",
      body: JSON.stringify(
          {
              msgID: 99,
              toolName: toolName,
              params: parms,
          }
      ),
  });
});
