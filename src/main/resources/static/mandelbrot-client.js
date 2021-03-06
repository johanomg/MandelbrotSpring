var currentCalculation;
var global_min_c_re;
var global_min_c_im;
var global_max_c_re;
var global_max_c_im;
var global_x;
var global_y;
var global_inf_n;
var global_divider;

function updateInputFields() {
    document.getElementById("min_c_re").value = global_min_c_re;
    document.getElementById("min_c_im").value = global_min_c_im;
    document.getElementById("max_c_re").value = global_max_c_re;
    document.getElementById("max_c_im").value = global_max_c_im;
    document.getElementById("x").value = global_x;
    document.getElementById("y").value = global_y;
    document.getElementById("inf_n").value = global_inf_n;
    document.getElementById("divider").value = global_divider;
}

function goSomeWhere(input, newOrOld) {
    parseGlobalVariablesToFloat();
    var xStepSize = global_max_c_re - global_min_c_re;
    var yStepSize = global_max_c_im - global_min_c_re;
    var deltaX = xStepSize / 20;
    var deltaY = yStepSize / 20;
    if (input == "right") {
        global_min_c_re += parseFloat(deltaX);
        global_max_c_re += parseFloat(deltaX);
    }
    if (input == "left") {
        global_min_c_re -= parseFloat(deltaX);
        global_max_c_re -= parseFloat(deltaX);
    }
    if (input == "up") {
        global_min_c_im += parseFloat(deltaX); //deltaY
        global_max_c_im += parseFloat(deltaX); //deltaY
    }
    if (input == "down") {
        global_min_c_im -= parseFloat(deltaX); //deltaY
        global_max_c_im -= parseFloat(deltaX); //deltaY
    }
    if (input == "zoom-in") {
        console.log('first x skillnad:');
        console.log(global_max_c_re - global_min_c_re);
        console.log('first y skillnad:');
        console.log(global_max_c_im - global_min_c_im);
        global_min_c_re += parseFloat(deltaX);
        global_max_c_re -= parseFloat(deltaX);
        global_min_c_im += parseFloat(deltaX); // deltaY
        global_max_c_im -= parseFloat(deltaX); // deltaY
        console.log('after x skillnad:');
        console.log(global_max_c_re - global_min_c_re);
        console.log('after y skillnad:');
        console.log(global_max_c_im - global_min_c_im)
    }
    if (input == "zoom-out") {
        console.log('first x skillnad:');
        console.log(global_max_c_re - global_min_c_re);
        console.log('first y skillnad:');
        console.log(global_max_c_im - global_min_c_im);
        global_min_c_re -= parseFloat(deltaX);
        global_max_c_re += parseFloat(deltaX);
        global_min_c_im -= parseFloat(deltaX); // deltaY
        global_max_c_im += parseFloat(deltaX); // deltaY
        console.log('after x skillnad:');
        console.log(global_max_c_re - global_min_c_re);
        console.log('after y skillnad:');
        console.log(global_max_c_im - global_min_c_im)
    }
    input = {
        parameterObject: {
            min_c_re: global_min_c_re,
            min_c_im: global_min_c_im,
            max_c_re: global_max_c_re,
            max_c_im: global_max_c_im,
            x: global_x,
            y: global_y,
            inf_n: global_inf_n,
            divider: global_divider
        }
    };

    var urlString = '';
    if(newOrOld === "old"){
        urlString = '/mandelbrot/test';
    } else urlString = '/mandelbrot/calcParallel';

    $.ajax({
        url: urlString,
        type: 'POST',
        data: JSON.stringify(input.parameterObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("Calculation objektet")
            console.log(result)
            currentCalculation = result;
            drawCanvas(result)
        }
    });
    updateInputFields()
}

function parseGlobalVariablesToFloat() {
    currentCalculation = parseFloat(currentCalculation);
    global_min_c_re = parseFloat(global_min_c_re);
    global_min_c_im = parseFloat(global_min_c_im);
    global_max_c_re = parseFloat(global_max_c_re);
    global_max_c_im = parseFloat(global_max_c_im);
    global_x = parseFloat(global_x);
    global_y = parseFloat(global_y);
    global_inf_n = parseFloat(global_inf_n);
    global_divider = parseFloat(global_divider);
}

function sendParameters() {
    global_min_c_re = $("#min_c_re").val();
    global_min_c_im = $("#min_c_im").val();
    global_max_c_re = $("#max_c_re").val();
    global_max_c_im = $("#max_c_im").val();
    global_x = $("#x").val();
    global_y = $("#y").val();
    global_inf_n = $("#inf_n").val();
    global_divider = $("#divider").val();

    var input = {
        parameterObject: {
            min_c_re: global_min_c_re,
            min_c_im: global_min_c_im,
            max_c_re: global_max_c_re,
            max_c_im: global_max_c_im,
            x: global_x,
            y: global_y,
            inf_n: global_inf_n,
            divider: global_divider
        }
    };

    $.ajax({
        url: '/mandelbrot/calcParallel',
        type: 'POST',
        data: JSON.stringify(input.parameterObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("Calculation objektet");
            console.log(result);
            currentCalculation = result;
            drawCanvas(result);
            // drawSpectrumCanvas(result);
        }
    })
}

function sendParametersOld() {
    global_min_c_re = $("#min_c_re").val();
    global_min_c_im = $("#min_c_im").val();
    global_max_c_re = $("#max_c_re").val();
    global_max_c_im = $("#max_c_im").val();
    global_x = $("#x").val();
    global_y = $("#y").val();
    global_inf_n = $("#inf_n").val();
    global_divider = $("#divider").val();

    var input = {
        parameterObject: {
            min_c_re: global_min_c_re,
            min_c_im: global_min_c_im,
            max_c_re: global_max_c_re,
            max_c_im: global_max_c_im,
            x: global_x,
            y: global_y,
            inf_n: global_inf_n,
            divider: global_divider
        }
    };

    $.ajax({
        url: '/mandelbrot/test',
        type: 'POST',
        data: JSON.stringify(input.parameterObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("Calculation objektet");
            console.log(result);
            currentCalculation = result;
            drawCanvas(result);
            // drawSpectrumCanvas(result);
        }
    })
}

// $("#calculate").on("click", function () {
//     sendParamters();
// });

function setGlobalVariablesFromCalculationObject(inputCalculation) {
    global_min_c_re = inputCalculation.calcParameters.min_c_re;
    global_min_c_im = inputCalculation.calcParameters.min_c_im;
    global_max_c_re = inputCalculation.calcParameters.max_c_re;
    global_max_c_im = inputCalculation.calcParameters.max_c_im;
    global_x = inputCalculation.calcParameters.x;
    global_y = inputCalculation.calcParameters.y;
    global_inf_n = inputCalculation.calcParameters.inf_n;
    global_divider = inputCalculation.calcParameters.divider;
}

function generateColorSpectrumArray() {
    var x = global_inf_n;
    // var x = inputCalculation.calcParameters.inf_n;
    var y = 100;
    var iterations = global_inf_n;
    document.getElementById("myCanvas").width = x;
    document.getElementById("myCanvas").height = y;
    // var coolArray = convertArray(inputCalculation);
    var arraySize = global_inf_n * 4 * y;
    var resultArray = new Uint8ClampedArray(arraySize);

    // var inputLength = Object.keys(inputCalculation.resultObj.resultData).length;
    // var resultArray = new Uint8ClampedArray(inputLength * 4);

    var R;
    var G;
    var B;

    var increment = (2 * Math.PI) / iterations;
    var arg = 0;
    var factorR;
    var factorG;
    var factorB;

    var counter = 0;
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < iterations * 4; j += 4) {
            C = counter;
            arg = increment * C;
            faktorR = ((0.5 * Math.sin(arg+(2*Math.PI)/10*6)) + 0.5)%255;
            faktorG = faktorR += ((0.5 * Math.sin(arg + (2 * Math.PI) / 3 * 1)) + 0.5);
            faktorB = faktorG += ((0.5 * Math.sin(arg + (2 * Math.PI) / 3 * 2)) + 0.5);

            R = Math.round(255 * faktorR);
            G = Math.round(255 * faktorG);
            B = Math.round(255 * faktorB);

            resultArray[j + 0] = R;   //R
            resultArray[j + 1] = G;   //G
            resultArray[j + 2] = B;   //B
            resultArray[j + 3] = 255; //A

            counter++;
        }
        faktorR = 0;
        faktorG = 0;
        faktorB = 0;
        arg = 0;
        counter = 0;
    }
    return resultArray;
}

// inputCalculation.calcParameters.inf_n
function drawSpectrumCanvas(inputCalculation) {
    // array = generateColorSpectrumArray(inputCalculation);
    x = global_inf_n;
    // x = inputCalculation.calcParameters.inf_n;
    y = 100;
    document.getElementById("colour-spectrum-canvas").width = x;
    document.getElementById("colour-spectrum-canvas").height = y;
    // console.log(inputCalculation.resultObj.resultData);
    var coolArray = generateColorSpectrumArray();
    var canvas = document.getElementById("colour-spectrum-canvas");

    var ctx = canvas.getContext("2d");
    var enNyImageData = ctx.createImageData(x, y);
    enNyImageData.data = coolArray;

    for (var i = 0; i < coolArray.length; i++) {
        enNyImageData.data[i] = coolArray[i];
    }
    console.log(coolArray);
    ctx.putImageData(enNyImageData, 0, 0);
    updateCalcDetailsTable(inputCalculation);

}

function drawCanvasFromCalculation(inputCalculation) {
    var x = inputCalculation.calcParameters.x;
    var y = inputCalculation.calcParameters.y;
    document.getElementById("myCanvas").width = x;
    document.getElementById("myCanvas").height = y;
    console.log(inputCalculation.resultObj.resultData);
    var coolArray = convertArray(inputCalculation);
    var canvas = document.getElementById("myCanvas");
    setGlobalVariablesFromCalculationObject(inputCalculation);
    updateInputFields();

    var ctx = canvas.getContext("2d");
    var enNyImageData = ctx.createImageData(x, y);
    enNyImageData.data = coolArray;

    for (var i = 0; i < coolArray.length; i++) {
        enNyImageData.data[i] = coolArray[i];
    }
    console.log(coolArray);
    ctx.putImageData(enNyImageData, 0, 0);
}

// todo refine redo reload
function drawCanvas(inputCalculation) {
    x = $("#x").val();
    y = $("#y").val();
    document.getElementById("myCanvas").height = y;
    document.getElementById("myCanvas").width = x;
    console.log(inputCalculation.resultObj.resultData);
    var coolArray = convertArray(inputCalculation);
    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");
    var enNyImageData = ctx.createImageData(x, y);
    enNyImageData.data = coolArray;

    for (var i = 0; i < coolArray.length; i++) {
        enNyImageData.data[i] = coolArray[i];
    }
    console.log(coolArray);
    ctx.putImageData(enNyImageData, 0, 0);
    updateCalcDetailsTable(inputCalculation);
}

function convertArray2(inputarray) { //100

    var C;
    var R;
    var G;
    var B;

    var inputLength = Object.keys(inputarray).length;
    var resultArray = new Uint8ClampedArray(inputLength * 4);

    var counter = 0;
    for (var i = 0; i < resultArray.length; i += 4) {
        C = inputarray[counter];

        C = C * global_divider;
        //
        // R = (C / (256 ^ 2)) % 256;
        // G = (C / 256) % 256;
        // B = C % 256;

        B = C & 255;
        G = (C >> 8) & 255;
        R = (C >> 16) & 255;

        resultArray[i + 0] = R;   //R
        resultArray[i + 1] = G;   //G
        resultArray[i + 2] = B;   //B
        resultArray[i + 3] = 255; //A
        counter++;
    }
    return resultArray;
}

function convertArray(inputCalculation) { //inputarray
    setGlobalVariablesFromCalculationObject(inputCalculation);
    //400
    var C;
    var R;
    var G;
    var B;

    var inputLength = Object.keys(inputCalculation.resultObj.resultData).length;
    var resultArray = new Uint8ClampedArray(inputLength * 4);

    var arg = 0;
    var faktorR;
    var counter = 0;


    var increment = (2 * Math.PI) / global_inf_n;
    for (var i = 0; i < resultArray.length; i += 4) {
        C = inputCalculation.resultObj.resultData[counter];


        arg = increment * C;
        faktorR = (0.5 * Math.sin(arg)) + 0.5
        faktorG = (0.5 * Math.sin(arg + (2 * Math.PI) / 3 * 1)) + 0.5;
        faktorB = (0.5 * Math.sin(arg + (2 * Math.PI) / 3 * 2)) + 0.5;


        C = C * global_divider;

        R = Math.round(255 * faktorR);
        G = Math.round(255 * faktorG);
        B = Math.round(255 * faktorB);

        resultArray[i + 0] = R;   //R
        resultArray[i + 1] = G;   //G
        resultArray[i + 2] = B;   //B
        resultArray[i + 3] = 255; //A

        faktorR = 0;
        faktorG = 0;
        faktorB = 0;
        arg = 0;

        counter++;
    }
    return resultArray;
}

function saveCalculation() {
    var inputTest = {
        calculation: {
            calcParameters: {
                min_c_re: min_c_re,
                min_c_im: min_c_im,
                max_c_re: max_c_re,
                max_c_im: max_c_im,
                x: x,
                y: y,
                inf_n: inf_n,
                divider: divider
            },
            resultData: [],
            timestamp: "",
            user: {
                name: "",
                password: ""
            }
        }
    };

    $.ajax({
        url: '/mandelbrot/save',
        type: 'POST',
        data: JSON.stringify(currentCalculation),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("inte error efter saveCalculation()");
            console.log(result)
        }
    })
}

function clearLoadedCanvasView() {
    var canvas = document.getElementById("myCanvas");
    var x = canvas.width;
    var y = canvas.height;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, x, y);
    canvas.width = 100;
    canvas.height = 100;
}

function getCalcFromDBbyIDLoad() {
    var id = $("#load-id").val();
    $.ajax({
        url: '/mandelbrot/getCalculation',
        type: 'POST',
        data: JSON.stringify(id),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            drawCanvasFromCalculation(result);
        }
    })
}

function getCalcFromDBbyID(id) {
    // var id = $("#load-id").val();
    $.ajax({
        url: '/mandelbrot/getCalculation',
        type: 'POST',
        data: JSON.stringify(id),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            drawCanvasFromCalculation(result);
        }
    })
}

function updateCalcDetailsTable(calculation) {
    var calcTime = calculation.resultObj.calculationTime;
    var totalIterations = (calculation.resultObj.totalIterations).toExponential(3);
    var timePerIteration = (calculation.resultObj.calculationTime / calculation.resultObj.totalIterations).toExponential(3);
    var deltaX = (calculation.calcParameters.max_c_re - calculation.calcParameters.min_c_re).toExponential(3);
    var deltaY = (calculation.calcParameters.max_c_im - calculation.calcParameters.min_c_im).toExponential(3);
    var x = calculation.calcParameters.x;
    var y = calculation.calcParameters.y;

    var emptyTable = "<tr> <th>calc time</th> <th>iterations</th> <th>time/iteration</th> <th>deltaX</th> <th>deltaY</th> <th>X</th><th>Y</th></tr>";
    var table = document.getElementById("calc-detail-table");
    table.innerHTML = emptyTable;
    var htmlString = "";
    htmlString += "<tr>";
    htmlString += "<td>" + calcTime + "</td>";
    htmlString += "<td>" + totalIterations + "</td>";
    htmlString += "<td>" + timePerIteration + "</td>";
    htmlString += "<td>" + deltaX + "</td>";
    htmlString += "<td>" + deltaY + "</td>";
    htmlString += "<td>" + x + "</td>";
    htmlString += "<td>" + y + "</td>";
    htmlString += "</tr>";
    table.innerHTML += htmlString;

}

function updateCalcList() {
    $.ajax({
        url: '/mandelbrot/getAllCalculationLight',
        type: 'POST',
        // data: JSON.stringify(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            // var letsSee = result;
            // console.log(letsSee);
            // console.log(result);

            var emptyTable = "<tr> <th>id</th> <th>min x</th> <th>max x</th> <th>min y</th> <th>max y</th> <th>resolution</th> <th>timestamp</th> <th>view</th> </tr>";
            var table = document.getElementById("calc-html-list");
            table.innerHTML = emptyTable;
            for (var key in result) {
                var obj = result[key];
                var buttonString = "<button type=\"button\" id=\"load-calc-button2\" onclick=\"getCalcFromDBbyID(" + obj.id + ")\">load</button>";
                var htmlString = "";
                htmlString += "<tr>";
                htmlString += "<td>" + obj.id + "</td>";
                htmlString += "<td>" + obj.calcParameters.min_c_re + "</td>";
                htmlString += "<td>" + obj.calcParameters.max_c_re + "</td>";
                htmlString += "<td>" + obj.calcParameters.min_c_im + "</td>";
                htmlString += "<td>" + obj.calcParameters.max_c_im + "</td>";
                htmlString += "<td>" + obj.calcParameters.x * obj.calcParameters.y + "</td>";
                htmlString += "<td>" + obj.timestamp + "</td>";
                htmlString += "<td>" + buttonString + "</td>";
                htmlString += "</tr>";
                table.innerHTML += htmlString;
            }
        }
    })
}