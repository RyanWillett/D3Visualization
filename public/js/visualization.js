var dataSet = undefined;
var gameDurationArr = [];

function generateD3BarGraph(lengthX, lengthY) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10};
    var width = lengthX - 5*margin.left - 3*margin.right,
        height = lengthY - 2*margin.top - 2*margin.bottom;
//  the width of each bar and the offset between each bar
    var barWidth = 6;
    var barOffset = 3;
    //var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05);

    console.log(gameDurationArr);
    //Create the svg canvas with a margin
    var svg = d3.select('#bar-chart')
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin")
    .attr("viewBox", "0 0 " + (width + 5*margin.left + 3*margin.right) + " " + (height + 2*margin.top + 2*margin.bottom))
    .classed("svg-content-responsive", true)

    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .style('background', '#dff0d8')
    .append("g")
    .attr("transform", "translate(" + 4*margin.left + "," + margin.top + ")");

    console.log(maxVal(gameDurationArr));
    var xAxisScale = d3.scaleLinear()
                        .domain([0,gameDurationArr.length])
                        .range([0,width]);

    var yAxisScale = d3.scaleLinear()
                        .domain([maxVal(gameDurationArr), 0])
                        .range([0,height]);

    var xAxis = d3.axisBottom(xAxisScale);

    var yAxis = d3.axisLeft(yAxisScale);
    //Attach the x axis to the floor of the graph
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .call(yAxis);

    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Game Duration");

    svg.append("text")
        .attr("transform", "translate(" + 2.7*-margin.left + " ," + (height/2) + ") rotate(-90)")
        .style("text-anchor", "middle")
        .text("Frequency");

    //create rectangles for the bar graph
    svg.selectAll('rect').data(gameDurationArr)
    .enter().append('rect')
    .attr('width', barWidth)
    .attr('height', function (data) {
        return data;
    })
    .attr('x', function (data, i) {
        //console.log(data);
        console.log(i)
        return i * (width / gameDurationArr.length);
    })
    .attr('y', function (data) {
        return height - data;
    })
    .attr('fill', '#d1c98b');
}

function getGameDurationArr(callback) {
    for (var i = dataSet.length - 1; i >= 0; i--) {
        gameDurationArr.push(dataSet[i].game_duration);
    }
}

function waitForElement(){
    if(typeof dataSet !== "undefined"){
        //variable exists, do what you want
        console.log(dataSet);
        var promise1 = new Promise(function(resolve, reject) {
            getGameDurationArr((data) => {
                getGameDurationArr = data;
                resolve();
            });
        });

        generateD3BarGraph(1024, 600);
    }
    else{
        setTimeout(waitForElement, 250);
    }
}

function maxVal(arr) {
    max = 0
    arr.forEach((elm) => {
        if(elm > max) {
            max = elm;
        }
    });
    return max;
}

$(document).ready(function() { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           dataSet = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", "../dataLoad", true);
    xhttp.send();
    waitForElement();
});
