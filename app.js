const folder = document.getElementById('folder');
const tool = document.getElementById('tool');
const output = document.getElementById('output');
const launch = document.getElementById('launchbtn');

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