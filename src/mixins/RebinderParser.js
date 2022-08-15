export default function(text) {
	const strings = text.split("\n")
		.filter(Boolean)
		.filter(s => /^[\r\n]$/.test(s)===false)
		.map(v => v.replace(/[\r\n]/g, ""));

	const values = toAliasAndBind(strings.shift());
	const entries = Array();

	const global = detectGlobalInject(strings);
	if (global.length) values.inject = global.join(";");

	const backwards = strings[0].split(" ").slice(-3)[0];
	if (backwards[0]==="bind" && backwards[1]!==values.keybind) {
		values.backwards = backwards[1].replace(/"/g,"");
	}

	const avgCmds = strings
		.map(s => s.split(";").filter(Boolean).length-1)
		.reduce((a,b) => a+b, 0) / strings.length;

	for (let i=0;i<strings.length;i++) {
		const result = lineToArgs(strings[i], strings[i+1], global, avgCmds, !!values.backwards);
		entries.push(result.entry);
		if (result.skip) i++;
	}

	return {
		values,
		entries
	};
}

function toAliasAndBind(line) {
	const args = line.split(" ");
	return {
		keybind: args[1].replace(/"/g, ""),
		alias: args[2].replace(/[";]/g,"").slice(0,-1), // Remove quotes and last digit "0"
	}
}

function detectGlobalInject(lines) {
	const trimmed =  lines.filter(l => !l.startsWith("// "));

	// Break up each line
	const args = trimmed.map(line => line.split(";").filter(Boolean));

	// Check if we have a string that is identical for all lines
	const found = Object.create(null);

	for (let i=0;i<args.length;i++) {
		for (let n=0;n<Array.from(new Set(args[i])).length;n++) {
			if (found[args[i][n]]) found[args[i][n]]++;
			else found[args[i][n]] = 1;
		}
	}

	const global = Array();
	for (const key in found) {
		if (found[key] !== trimmed.length) continue;
		global.push(key)
	}

	return global;
}

function lineToArgs(line, nextLine, global, avgCmds, hasBackwards) {
	const entry = {
		command: {
			placeholder: "do_thing 1",
			value: undefined,
		},
		comment: {
			placeholder: "Does X thing",
			value: undefined,
		},
		inject: {
			placeholder: 'say_team "did X thing"',
			value: undefined
		},
	};

	if (line.startsWith("//")) {
		entry.comment.value = line.replace("// ", "");
		line = nextLine;
	}

	let args = line
		.split(" ")
		.slice(2, hasBackwards ? -3 : -2) // Remove first 'Alias X' + last + consider backwards bind
		.join(" ")
		.slice(1) // Remove first "
		.split(" ");

	// Remove last XXXXX;bind
	args[args.length-1] = args[args.length-1]
		.replace(";bind", "");

	// Remove global injections
	args = args
		.join(" ")
		.split(";")
		.filter(w => !global.includes(w));

	// Split Inject and Command based on average args per line
	entry.command.value = args.slice(0, Math.ceil(avgCmds/2)).join(";");
	entry.inject.value = args.slice(Math.ceil(avgCmds/2)).join(";")

	return {
		skip: !!entry.comment.value,
		entry
	};
}