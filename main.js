$.ajax({
    "url": "modules.json",
    "dataType": "json"
}).then(function(modules) {
    var rows = [];

    modules.forEach(function(module) {
        var row = "<tr>";

        if (module.addons) {
						row += "<td><a href='https://addons.silverstripe.org/add-ons/" + module.composer + "'>" + module.composer + "</a></td>";
				}
        else {
						if (module.github) {
								row += "<td><a href='https://github.com/" + module.github + "'>" + module.composer + "</a></td>";
						} else if (module.gitlab) {
								row += "<td><a href='https://gitlab.cwp.govt.nz/" + module.gitlab + "'>" + module.composer + "</a></td>";
						} else {
								row += "<td>" + module.composer + "</td>";
						}
				}

        if(module.type === "supported-module") {
            row += "<td>" + "Supported module" + "</td>";
        } else {
            row += "<td>" + "Supported dependency" + "</td>";
        }

				if (module.github) {
						row += "<td class='progress first'><a href='https://travis-ci.com/" + module.github + "'><img src='https://api.travis-ci.com/" + module.github + ".svg' /></a></td>";
						row += "<td class='progress'><a href='https://codecov.io/gh/" + module.github + "'><img title='' src='https://codecov.io/gh/" + module.github + "/branch/master/graph/badge.svg' alt=''/></a></td>";
						if (module.scrutinizer) {
								row += "<td class='progress last'><a href='https://scrutinizer-ci.com/g/" + module.github + "'><img src='https://scrutinizer-ci.com/g/" + module.github + "/badges/quality-score.png'/></a></td>";
						} else {
								row += "<td class='progress last'><img src='https://img.shields.io/badge/Scrutinizer-n%2Fa-lightgrey.svg'/></td>";
						}
				} else if (module.gitlab) {
						row += "<td colspan='3'>Module on Gitlab</td>";
				} else {
						row += "<td colspan='3'>Module definition incomplete</td>";
				}

        row += "</tr>";

        rows.push(row);
    });

    $("tbody").html(rows.join(""));
});
