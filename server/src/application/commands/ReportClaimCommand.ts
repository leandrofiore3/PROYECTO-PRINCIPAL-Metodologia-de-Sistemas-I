#!/usr/bin/env node
import commander from 'commander';
import { Command } from 'commander';

//const program = new Command();
//program 
//.option('-p, --port <port>', 'Specify the port')
//.parse(process.argv);

//console.log('Port: ${program.port}');

new commander
    .Command('report-claim')//NO EXISTE EN LA IMPORTACION  ????
  .description('Generates a report for a claim')
  .option('-t, --type <type>', 'Specify the type of claim')
  .action((options: { type: string; }) => {
    const claimType = options.type || 'default';
    
    // genera informa
    console.log(`Generating report for claim type: ${claimType}`);
  });

commander.parse(process.argv); 