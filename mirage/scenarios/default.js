export default function(server) {

  function store() {
    let data = server.db.dump();
    let json = JSON.stringify(data);

    localStorage.mirage = json;
  }

  function load() {
    let json = localStorage.mirage;

    if (json) {
      let data = JSON.parse(json);
      server.db.loadData(data);
    } else {
      server.createList('label', 5);
      store();
    }
  }

  load();

  server.pretender.handledRequest = store;

}
