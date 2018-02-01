var dataSet = undefined;
var gameDurationArr = [];



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


    function generateD3() {
        var height = 200;
        var width = 720;
     
    //  the width of each bar and the offset between each bar
        var barWidth = 40;
        var barOffset = 20;

        console.log(gameDurationArr);


        var svg = d3.select('#bar-chart').append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('background', '#dff0d8');

          svg.selectAll('rect').data(gameDurationArr)
          .enter().append('rect')
            .attr('width', barWidth)
            .attr('height', function (data) {
                return data;
            })
            .attr('x', function (data, i) {
                console.log(data);
                return i * (barWidth + barOffset);
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

            generateD3();
        }
        else{
            setTimeout(waitForElement, 250);
        }
    }

});
