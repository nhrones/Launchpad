
import { serve } from "./deps.ts";
import { join } from "./deps.ts";
import { serveFile } from "./deps.ts";
import * as browser from './browser.ts';
import { postMessage } from './post.ts'

export let targetPort = 8000

// process commandline args
const arg0 = (parseInt(Deno.args[0]) > 0) ? parseInt(Deno.args[0]) : Deno.args[0]
const arg1 = Deno.args[1] || ''

if (arg0 === '-h') {
   console.log(`
Usage:
commandline options:
arg[0] = port number or target folder (if target folder, port number defaults to 80)
arg[1] = target folder (expected that arg[0] is a port number)
`)
   Deno.exit(0)
}

targetPort = (arg0 && typeof arg0 === 'number') ? arg0 : 80
const targetFolder = (typeof arg0 === 'string') ? arg0 : (arg1) ? arg1 : '';

// Start the server -> routes all requests to the handler below
serve(handleRequest, { port: targetPort })

// Handle all HTTP requests
function handleRequest(request: Request): Promise<Response> {

   // service all POST requests - (Remote Procedure Calls)      
   if (request.method === 'POST') {
      //console.log('POST recieved')
      return postMessage(request)
   }
   
   // Get and adjust the requested path name
   let { pathname } = new URL(request.url); // get the path name
   if (pathname === '/') pathname = '/index.html'; // fix root

   // determin the requested full-path
   const fullPath = (targetFolder.length > 0)
      ? join(Deno.cwd() + '\\' + targetFolder + pathname)
      : join(Deno.cwd() + pathname);

   console.log(`Serving ${fullPath}`); // show what was requested
   // find the file -> get the content -> return it in a response
   return serveFile(request, fullPath) //.substring(1));
}

// Trigger browser start
browser.start()
