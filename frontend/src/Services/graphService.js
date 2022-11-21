export class GraphService {

  vertex;       // numero de animais
  matrixAdj = new Map(); // matrix de adjacencia

  constructor(vertex) {
    this.vertex = vertex;
    this.matrixAdj = new Map();
  }

  // configurar no para ser usado com a bibliteca cytoscape
  nodeSelector(id, label, image, color) {
    const node = {
      data: {
        id,
        label,
        image,
        color
      }

    };

    return node;
  }

  edgeSelector(source, target) {
    const edge = {
      data: {
        source,
        target,
        label: `Edge from ${source} to ${target}`,
      }
    };

    return edge;
  }

  // IMPORTANTE: Trata os dados para o formato de mapping -> exemp: ["rato", ["elefante", "humano",...]]
  addEdge(v, w) {

    console.log(v, "nao achou??")
    const values = this.matrixAdj.get(v) ?? [];
    this.matrixAdj.set(v, [...values, w]);
  }

  graph() {
    return this.matrixAdj;
  }

  bfs(start) {
    const foundedAnimals = [];
    const queue = [];
    const visited = new Array(this.vertex);

    let i, tam = visited.length;
    for (i = 0; i < tam; ++i) {
        visited[i] = false;
    }

    visited[start] = true;
    queue.push(start)

    while(queue.length) {
      const selectAnimal = queue.shift();

      foundedAnimals.push(selectAnimal);

      const presas = this.matrixAdj.get(selectAnimal);

      presas.forEach((presa) => {
        if(!visited[presa]) {
          visited[presa] = true;
          queue.push(presa);
        }
      });
    }

    return foundedAnimals;
  }

}