var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160]; //Play around w/ different datasets to test responsiveness of chart
// var dataset = [1,2,3,4,5];

var svgWidth = 500, svgHeight = 300, barPadding = 15;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//scales: functions that transform data by either increasing or decreasing their values for better visualizations.     
var yScale = d3.scaleLinear()
.domain([0, d3.max(dataset)]) //takes [] as argument, contains 2 elements--> 0, maximum number in our data set.
.range([0, svgHeight -20]);    //.range() keep the scale values inside the range of our SVG container.
    
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - yScale(d)  //pass the values of our Y coordinate and height of the rectangle using a Y-scale method.
    })
    .attr("height", function(d) { 
        return yScale(d) ; 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });

//creating labels   
var text = svg.selectAll("text")
    .data(dataset)
    .enter() //bring in data items one by one for further processing.
    .append("text") //append text for each of that item, want to keep its value to be the number itself.
    .text(function(d) { //.text() method gets value of our data item, function gets data value 
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - yScale(d) -2;
        // return svgHeight - d -2; //want text to be slightly higher than our bar.
    })
    .attr("x", function(d, i) { //i = index of data elements
        return barWidth * i;
    })
    .attr("fill", "#A64C38");

