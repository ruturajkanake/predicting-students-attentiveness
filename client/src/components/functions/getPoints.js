var XArray = [],
    YArray = [],

var completeXArray = [],
    completeYArray = [],

var Yavg, // for storing moving average
    Yvar;

function plot(Xdata, Ydata) {
    // cap Ydata
    if (Ydata > 50) Ydata = 50;

    // console.log('Xinit', Xdata);
    // console.log('Yinit', Ydata);

    XArray.push(Xdata);
    completeXArray.push(Xdata);
    
    completeYArray.push(Ydata);

    if (completeYArray.length >= 3) {
        Yavg = completeYArray.slice(-3).reduce(function(a, b) {
            return a + b;
        }) / 3.0; // takes average of last three elements

        Yvar = Math.abs((Yavg - Ydata));
        YArray.push(Yvar);
    } else {
        XArray.shift(); // remove that data from it
    }
    
    if (XArray.length > 10 && XArray[XArray.length - 1] - XArray[0] > 30) {
        XArray.shift(); // remove first entry
        YArray.shift();
    }
}