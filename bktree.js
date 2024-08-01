// Clase Nodo (Node) para el árbol BK
class Node {
    constructor(element) {
        this.element = element; // Elemento almacenado en el nodo
        this.children = {};     // Hijos del nodo, organizados por distancia
    }
}

// Clase BKTree para manejar la estructura y las operaciones del árbol BK
class BKTree {
    constructor(distanceFunc) {
        this.root = null;                // Raíz del árbol BK
        this.distanceFunc = distanceFunc; // Función de distancia utilizada para comparar elementos
    }

    // Método para insertar un nuevo elemento en el árbol BK
    insert(element) {
        // Si el árbol está vacío, el nuevo elemento se convierte en la raíz
        if (!this.root) {
            this.root = new Node(element);
            return;
        }

        // Si el árbol no está vacío, insertamos el nuevo elemento en la posición correcta
        let currentNode = this.root;
        while (true) {
            let distance = this.distanceFunc(currentNode.element, element);
            // Si un hijo con la misma distancia ya existe, seguimos recorriendo el árbol
            if (distance in currentNode.children) {
                currentNode = currentNode.children[distance];
            } else {
                // Si no existe un hijo con la misma distancia, creamos un nuevo nodo
                currentNode.children[distance] = new Node(element);
                break;
            }
        }
    }

    // Método para buscar elementos dentro de un umbral de distancia
    search(query, threshold) {
        if (!this.root) {
            return [];
        }

        let results = [];               // Resultados de la búsqueda
        let nodesToVisit = [this.root]; // Nodos que aún tenemos que visitar

        // Mientras haya nodos por visitar
        while (nodesToVisit.length > 0) {
            let currentNode = nodesToVisit.pop();
            let distance = this.distanceFunc(currentNode.element, query);
            // Si la distancia está dentro del umbral, agregamos el elemento a los resultados
            if (distance <= threshold) {
                results.push(currentNode.element);
            }

            // Recorremos los hijos del nodo actual dentro del rango de distancia
            for (let dist in currentNode.children) {
                if (distance - threshold <= dist && dist <= distance + threshold) {
                    nodesToVisit.push(currentNode.children[dist]);
                }
            }
        }

        return results;
    }
}
