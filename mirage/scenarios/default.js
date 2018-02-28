export default function(server) {

  function store() {
    let data = server.db.dump();
    let json = JSON.stringify(data);

    localStorage.mirage = json;
  }

  function load() {
    let json = localStorage.mirage || '{}';
    let data = JSON.parse(json);

    server.db.loadData(data);
  }

  load();

  server.pretender.handledRequest = store;

}
