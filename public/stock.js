// turn the rows into something usable by the chart maker
price_arrays = [];
for (obj of prices) {
  price_arrays.push([obj.day, obj.price]);
}

// load the premade navbar
fetch("/navbar.html")
  .then(res => res.text())
  .then(html => document.getElementById("navbar").innerHTML = html);

// prep for drawing the chart
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.setOnLoadCallback(drawAxisTickColors);

// draws the actual chart
function drawAxisTickColors() {
  var data = new google.visualization.DataTable();
  data.addColumn("number", "X");
  data.addColumn("number", "");
  data.addRows(price_arrays);
  var options = {
    legend: { position: "none" },
    hAxis: {
      title: "Day",
      textStyle: {
        color: "#01579b",
        fontSize: 20,
        fontName: "Arial",
        bold: true,
        italic: true,
      },
      titleTextStyle: {
        color: "#01579b",
        fontSize: 20,
        fontName: "Arial",
        bold: false,
        italic: false,
      },
    },
    vAxis: {
      title: "Price",
      textStyle: {
        color: "#1a237e",
        fontSize: 20,
        bold: false,
      },
      titleTextStyle: {
        color: "#1a237e",
        fontSize: 20,
        bold: false,
        italic: false,
      },
    },
    colors: ["green"],
  };
  var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}
