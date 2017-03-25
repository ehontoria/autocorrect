import string

swears = "swears.txt"
replacements = "replacements.txt"
results = open("results.txt", "w")

results.write("{ \"swears\" : [ ")

with open(swears) as s:
	writetext = ""
	for sline in s:
		if " " not in sline:
			line = sline.replace('\n', '').replace('\r', '')
			writetext += "\"" + line + "\","
	results.write(writetext)

results.write(" ],\n")
results.write(" \"replace\" : { ")

alphabet = list(string.ascii_lowercase)
textmap = ''

for char in alphabet:
	with open(replacements) as r:
		textmap += "\"" + char + "\" : ["
		for rline in r:
			if rline[0].lower() == char:
				line = rline.replace('\n', '').replace('\r', '')
				textmap += "\"" + line + "\","					
	if len(textmap) > 1:
		textmap = textmap[:-1]
	textmap += "],\n"
	r.close()


results.write(textmap + "} \n }")


