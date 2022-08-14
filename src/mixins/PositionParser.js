export default function(inputText, container=Array()) {
	const lines = inputText.split(/\n/g);

	for (let i=0;i<lines.length;i++) {
		if (!lines[i]?.startsWith("setpos ")) continue;

		const item = {
			id: i,
			command: {
				value: subtractY(lines[i].replace(/\n|\r/g,"")),
				placeholder: "setpos 1 1 1;setang 1 1 1;"
			},
			comment: {
				value: undefined,
				placeholder: "Something at X position"
			},
			inject: {
				value: undefined,
				placeholder: 'say_team "Doing X";'
			}
		};

		if (lines[i+1]?.startsWith("(Terrorist) ") || lines[i+1]?.startsWith("(Counter-Terrorist) ")) {
			item.inject.value = `say_team "${extractMsg(lines[i+1])}";`;
			i++;
		}

		container.push(item);
	}

	return container;
}

function extractMsg(line) {
	return line
		.split(" ")
		.slice(7)
		.join(" ")
		.replace(/\n|\r/g,"");
}

function subtractY(string) {
	const args = string.split(" ").map(t => t.trim());
	const newPos = Number(args[3].replace(";setang", "")) - 64;
	args[3] = newPos.toString() + ";setang"
	return args.join(" ");
}