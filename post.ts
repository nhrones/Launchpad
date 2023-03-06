//import {DEBUG} from './constants.ts';
const DEBUG = true

/** handler used to POST a message to a common BroadcastChannel, 
 * @param req (Request) - the original http request object
 * @returns (Promise<Response>) the required Response object 
 */
export async function postMessage(req: Request): Promise<Response> {
   const data = await req.json();
   const { msgID, toolName, params } = data

   let cmd = ["cmd", "/c", "echo nope!"];

   switch (toolName) {
      case 'serve':
         cmd = ["cmd", "/c", "serve", `${params.port}`];
         console.log(`cmd: "${toolName}", folder: "${params.folder}", port:${params.port}`)
         break;

      case 'hot':
         //cmd = ["cmd", "/c", "hot", "dist", `${params.port}`];
         console.log(`cmd: "${toolName}", srcfolder: "${params.srcfolder}", destination: "${params.destination}", port:${params.port}`)
         break;
      case 'build': // destination: destFolder, minify: false 
         //cmd = ["cmd", "/c", "build", `${params.destination}`, `${params.minify}`];
         console.log(`cmd: "${toolName}", destination: "${params.destination}", minify = ${params.minify}`)
         break;
      case 'log':
         cmd = ["cmd", "/c", "log", `${params.port}`];
         console.log(`cmd: "${toolName}", port:${params.port}`)
         break;
      default:
         console.log('Unknown tool!', toolName)
         break;
   }
   
   console.info("deno run cmd = ", cmd)
   //////////////////////////////////////
   //  Opens index.html in the browser  //
   //////////////////////////////////////
   // create subprocess
   const p = Deno.run({ cmd });

   await p.status()
      .then(() => console.log())
      .catch((reason) => console.warn(reason));

   return new Response("");
}