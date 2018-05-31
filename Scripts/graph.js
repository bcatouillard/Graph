JSONFile("weight.json", function(text){
    var data = JSON.parse(text);
    weighthistory = data.WEIGHTHISTORY;
    document.getElementById("FULLNAME").innerHTML = weighthistory.FULLNAME;


    var labels = weighthistory.WEIGHTLIST.map(function(e){return e.DATE});

    labels = labels.reverse();

    var data = weighthistory.WEIGHTLIST.map(function(e){return e.VALUE});

    data = data.reverse();

    var jour = new Array();
    var mois = new Array();
    var annee = new Array();

    for(var x=0 ; x <= labels.length-1; x++){
        jour[x] = parseInt(labels[x].substring(0,2),10);
        mois[x] = parseInt(labels[x].substring(3,5),10);
        annee[x] = parseInt(labels[x].substring(6,10),10);
    }
    
    var compt = 1;

    for(var x=0; x<= labels.length-1; x++){
        var sous = jour[x+1] - jour[x];
        if(sous<0 || sous>1){
            var add = String(jour[x]+1);
            if(parseInt(add,10)<10){
                if(mois[x]<10){
                    var string = "0"+add + "-" + "0"+mois[x] + "-" + annee[x];
                }
                else{
                    var string = "0"+add + "-" + mois[x] + "-" + annee[x];
                }
            }
            else{
                if(mois[x]<10){
                    var string = add + "-" + "0"+mois[x] + "-" + annee[x];
                }
                else{
                    var string = add + "-" + mois[x] + "-" + annee[x];
                }
            }
            if(annee[x+1] - annee[x] > 0 ){
                labels.splice(x+compt,0,string);
                data.splice(x+compt,0,"NaN");
                compt++;
            }
            else if(mois[x+1] - mois[x] > 0){
                labels.splice(x+compt,0,string);
                data.splice(x+compt,0,"NaN");
                compt++;
            }
            else if(jour[x+1] - jour[x] > 0){
                labels.splice(x+compt,0,string);
                data.splice(x+compt,0,"NaN");
                compt++;
            }
        }
    }





    var ctx = document.getElementById("weight").getContext('2d');

    var config = {
        type: 'line',
        data: {
           labels : labels,
           datasets: [{
               data : data,
               borderColor: '#FC0101',
               fill: false,
               lineTension: 0,
               spanGaps: false
           }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Poids',
                        fontsize: 50
                    }
                }],
                xAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Temps',
                        fontsize: 50
                    }
                }]
            }
        }
    }

    var myChart = new Chart(ctx, config);


    var ctx1 = document.getElementById("tension").getContext('2d');

    // var labels1 = weighthistory.BLOODPRESSURELIST.map(function(e){return e.TIME});

    // var data1 = weighthistory.BLOODPRESSURELIST.map(function(e){return e.VALUE});

    // var config1 = {
    //     type: 'line',
    //     data: {
    //        labels : labels1,
    //        datasets: [{
    //            data : data1,
    //            borderColor: '#1302FB',
    //            fill: false,
    //            lineTension: 0,
    //            spanGaps: false
    //        }]
    //     },
    //     options: {
    //         legend: {
    //             display: false
    //         },
    //         scales: {
    //             yAxes: [{
    //                 scaleLabel:{
    //                     display: true,
    //                     labelString: 'Tension',
    //                     fontsize: 50
    //                 }
    //             }],
    //             xAxes: [{
    //                 scaleLabel:{
    //                     display: true,
    //                     labelString: 'Temps',
    //                     fontsize: 50
    //                 }
    //             }]
    //         }
    //     }
    // }

    // var myChart1 = new Chart(ctx1, config1);

});






function JSONFile(file, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", file, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            callback(request.responseText);
        }
    }
    request.send(null);
}
