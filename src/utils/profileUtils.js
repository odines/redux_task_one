export default function swapArray(array) {
	for (let index = 0; index < array.length; index++) {
		if (array[index].label === 'web' && (index !== 0)) {
			[array[index], array[0]] = [array[0], array[index]];
			break;
		}
	}
}
