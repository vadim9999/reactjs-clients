import clientsJSON from '../../data/clients.json';

const parser = function ( filename ){

	return JSON.parse( JSON.stringify(filename) )
}

function getClients(){
  return parser(clientsJSON);
}

export { getClients }
