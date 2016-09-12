

function ksort(w) {
    var sArr = [], tArr = [], n = 0;

    for (i in w){
        tArr[n++] = i;
    }

    tArr = tArr.sort();
    for (var i=0, n = tArr.length; i<n; i++) {
        sArr[tArr[i]] = w[tArr[i]];
    }
    return sArr;
}


function calcCharsJson (text)
{

      //Only a-z lowercase alphabet
      var allowed = /[a-z]/;


var results = Array.prototype.reduce.call(text, function (data, letter) {

    if (allowed.test(letter)) {
        letter = letter.toLowerCase();
        if (data[letter] === undefined) {
            data[letter] = 0;
        }
        data[letter] += 1;
    }

    return data;

}, {});
return JSON.stringify(results);
}

$(function () {
    $('#container-chart').highcharts({
      
        chart: {
            type: 'bar'
               },

        title: {
            text: 'Reps letters'
               },

        xAxis: {
            categories: ['letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter']
               },

         yAxis:{
        tickInterval: 1,
               },

        series: [{
            name: 'Reps',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    });

    // button handler
    var chart = $('#container-chart').highcharts(),
        y = 0;



    $("#encode-decode").on('blur',function(e){
    if(e.target.value === '')
        {
            //update xAxis: 'letter' everywhere
            var letterArray = ['letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter', 'letter','letter','letter', 'letter'];
            chart.xAxis[0].update({categories: letterArray});
            //update series value to 0
            for(var i = 0; i < 27; i++)
              {
                  y = 0;
                  chart.series[0].data[i].update(y);
              }
        }
      else
            {
                //calcCharsJson - return json frequency analyse textarea
                var result = JSON.parse(calcCharsJson(e.target.value));
                var stateSwitcher = $('.sort-control-switcher').prop('checked');
                if(stateSwitcher)
                {
                    result = ksort(JSON.parse(calcCharsJson(e.target.value)));
                }

                var iterator = 0;
                var letterArray = [];
                for(var i = 0; i < 26; i++)
                {
                    chart.series[0].data[i].update(0);
                }
                //dynamically update xAxis & series of chart
                for(var letter in result)
                    {
                        y = result[letter];
                        var pushed = letterArray.push(letter);
                        chart.series[0].data[iterator].update(y);
                        chart.xAxis[0].update({categories: letterArray})
                        iterator++;
                    }
            }
    });
});
