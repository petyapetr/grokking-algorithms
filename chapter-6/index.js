function createGraph(arr) {
	const graph = new Map();

	arr.forEach((pair) => {
		let [from, to] = pair.split("-");

		if (!graph.has(from)) {
			graph.set(from, new Set());
		}

		if (!graph.has(to)) {
			graph.set(to, new Set());
		}

		graph.get(from).add(to);
		// graph.get(to).add(from);
	});

	return graph;
}

function breadthFirstSearch(graph, start, end) {
	const queue = [];
	queue.push(start);

	const prev = solve();
	const path = reconstructPath(prev, end);

	return path;

	function solve() {
		const visited = new Set();
		visited.add(start);

		// prev is a collection of key value pair
		// key is name of a node
		// value is a node that pointed at it first
		// prev keeps only first pointer since it's shortest path
		// we ensure that it it's the shortest path due to a
		// nature of queue and existence of visited set
		const prev = new Map(Array.from(graph.keys()).map((key) => [key, null]));

		while (queue.length !== 0) {
			const node = queue.splice(0, 1)[0];
			const neighbors = graph.get(node);

			if (neighbors) {
				const arr = Array.from(neighbors);
				arr.forEach((next) => {
					if (!visited.has(next)) {
						queue.push(next);
						visited.add(next);
						prev.set(next, node);
					}
				});
			}
		}

		return prev;
	}

	function reconstructPath(prev, end) {
		const path = [];

		for (let at = end; at !== null; at = prev.get(at)) {
			path.push(at);
		}

		path.reverse();

		if (path[0] === start) return path;

		return [];
	}
}

const EXERCISE_ONE = ["a-b", "a-c", "b-d", "b-f", "c-d", "c-e", "e-f"];
const exerciseOneGraph = createGraph(EXERCISE_ONE);
const exerciseOneResult = breadthFirstSearch(exerciseOneGraph, "a", "f");
console.log(exerciseOneResult);

const EXERCISE_TWO = ["cab-car", "cab-cat", "car-cat", "car-bar", "cat-mat", "cat-bat", "bar-bat", "mat-bat"];
const exerciseTwoGraph = createGraph(EXERCISE_TWO);
const exerciseTwoResult = breadthFirstSearch(exerciseTwoGraph, "cab", "bat");
console.log(exerciseTwoResult);
