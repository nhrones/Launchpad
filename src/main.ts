/// <reference lib="dom" />


const folder = document.getElementById('folder') as HTMLInputElement;
const tool = document.getElementById('tool') as HTMLSelectElement;
const output = document.getElementById('output') as HTMLOutputElement;
const launch = document.getElementById('launchbtn') as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", event => {
   // we can move only if we are not in a browser's tab
   if (isDesktop()) {
      window.moveTo(1, 1);
      let width = 500;
      let height = 325;
      window.resizeTo(width, height);
   }
});

launch.addEventListener('click', () => {
  const folderName = folder.value;
  const toolName = tool.value;

  output.value = `${toolName} ${folderName}`;
});

const isDesktop = () =>  !(matchMedia("(display-mode: browser)").matches);