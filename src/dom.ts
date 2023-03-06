/// <reference lib="dom" />


export let source: HTMLInputElement;
export let tool: HTMLSelectElement;
export let output: HTMLOutputElement;
export let launchButton: HTMLButtonElement;
export let destination: HTMLInputElement;
export let port: HTMLInputElement

export function init() {
   
   // we can move only if we are not in a browser's tab
   if (isDesktop()) {
      window.moveTo(1, 1);
      let width = 500;
      let height = 325;
      window.resizeTo(width, height);
   }

   port = document.getElementById('port') as HTMLInputElement;
   source = document.getElementById('srcfolder') as HTMLInputElement;
   destination = document.getElementById('destfolder') as HTMLInputElement;
   tool = document.getElementById('tool') as HTMLSelectElement;
   output = document.getElementById('output') as HTMLOutputElement;
   launchButton = document.getElementById('launchbtn') as HTMLButtonElement;
}

function isDesktop(): boolean {
   return !(matchMedia("(display-mode: browser)").matches);
}