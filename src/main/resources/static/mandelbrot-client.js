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
}

function goSomeWhere(input) {
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

    $.ajax({
        url: '/mandelbrot/test',
        type: 'POST',
        data: JSON.stringify(input.parameterObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("Calculation objektet")
            console.log(result)
            currentCalculation = result;
            drawCanvas(result.resultData)
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
        url: '/mandelbrot/test',
        type: 'POST',
        data: JSON.stringify(input.parameterObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log("Calculation objektet")
            console.log(result)
            currentCalculation = result;
            drawCanvas(result.resultData)
        }
    })
}

// $("#calculate").on("click", function () {
//     sendParamters();
// });

function drawCanvasFromCalculation(inputCalculation) {
    var x = inputCalculation.calcParameters.x;
    var y = inputCalculation.calcParameters.y;
    document.getElementById("retrievedCanvas").width = x;
    document.getElementById("retrievedCanvas").height = y;
    console.log(inputCalculation.resultData);
    var coolArray = convertArray(inputCalculation.resultData);
    var canvas = document.getElementById("retrievedCanvas");


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
function drawCanvas(inputArray) {
    x = $("#x").val();
    y = $("#y").val();
    document.getElementById("myCanvas").height = y;
    document.getElementById("myCanvas").width = x;
    console.log(inputArray);
    var coolArray = convertArray(inputArray);
    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");
    var enNyImageData = ctx.createImageData(x, y);
    enNyImageData.data = coolArray;

    for (var i = 0; i < coolArray.length; i++) {
        enNyImageData.data[i] = coolArray[i];
    }
    console.log(coolArray);
    ctx.putImageData(enNyImageData, 0, 0);
}

function convertArray(inputarray) { //100
    //400
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

        B =  C & 255;
        G = (C >> 8) & 255;
        R =   (C >> 16) & 255;

        resultArray[i + 0] = R;   //R
        resultArray[i + 1] = G;   //G
        resultArray[i + 2] = B;   //B
        resultArray[i + 3] = 255; //A
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
    var canvas = document.getElementById("retrievedCanvas");
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

function updateCalcList() {
    $.ajax({
        url: '/mandelbrot/getAllCalculationLight',
        type: 'POST',
        // data: JSON.stringify(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var letsSee = result;
            console.log(letsSee);
            console.log(result);

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