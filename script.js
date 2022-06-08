async function byProgress(response, progressHandler) {
	const reader = response.body.getReader();
	const chunks = [];
	let length = 0;

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		chunks.push(value);
		length += value.length;

		progressHandler(length);
	}

	const buff = new Uint8Array(length);
	let index = 0;

	for (const chunk of chunks) {
		buff.set(chunk, index);
		index += chunk.length;
	}

	return new TextDecoder("utf-8").decode(buff);
}