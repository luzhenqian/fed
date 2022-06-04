// import { Terminal } from 'xterm'

var term = new Terminal();

term.open(document.getElementById('terminal'));
term.write('Welcome to \x1B[1;3;31m@zx.js.org\x1B[0m $ ')
term.onKey(
  async ({ key, domEvent: ev }) => {
    let userInput = '';

    if (ev.keyCode == 13) {
      await runCommand(term, userInput);

      userInput = '';
      prompt(term);
    } else {
      term.write(key);
      userInput += key;
    }

    if (ev.ctrlKey && ev.key === 'l') {
      term.clear();
      return;
    }

    if (ev.ctrlKey && ev.key === 'c') {
      prompt(term);
      userInput = '';
      return;
    }
  }
)


const lsCommand = {
  id: "ls",
  description: 'list files',
  usage: '[usage]: ls filename',
  args: 0,
  async run(term, args) {
    for (const file of files) {
      term.write(file.name + '\t\t');
    }
  },
};
const commands = []
commands.push(lsCommand);
function runCommand(term, userInput) {
  const cmd = commands.find(({id}) => id === userInput)
  if(cmd)cmd.run()
  else {
    term.write('\n')
    term.writeln('Command not found. Type "help" to list available commands')
  }
}
function prompt(term){

}