// Include the MQTT library (e.g., Paho MQTT)
// Add the script tag to include the library in your HTML file

// Connect to the MQTT broker
const client = new Paho.MQTT.Client("broker.emqx.io", 8083, "emqx");
var ML_cost = 0;
var MS_cost = 0;
var YL_cost = 0;
var YS_cost = 0;

var ML_price = 0;
var MS_price = 0;
var YL_price = 0;
var YS_price = 0;

var ML_quanity = 0;
var MS_quanity = 0;
var YL_quanity = 0;
var YS_quanity = 0;

// Set up event handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect to the broker
client.connect({ onSuccess: onConnect });

// Callback on successful connection
function onConnect() {
    console.log("Connected to MQTT broker");
    // Subscribe to the topic where product names are published
    client.subscribe("product/detection");
}

// Callback on connection loss
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
}

// Product Names
// Maggi-large, Maggi-small, Yippee-large, Yippie-small

// Callback on message arrival
function onMessageArrived(message) {
    // Handle the received product name
    const productName = message.payloadString;
    console.log("Received product name: " + productName);
    switch (productName) {
        case "Maggi-large":
            // updateProductUI("Maggi-large");
            ML_quanity += 1;
            document.getElementById("ML-quanity").value = ML_quanity;
            ML_cost += 101;
            ML_price += 112;
            document.getElementById("ML-Total").innerHTML = "₹"+String(ML_cost);
            break;
        case "Maggi-small":
            // updateProductUI("Maggi-small");
            MS_quanity += 1;
            document.getElementById("MS-quanity").value = MS_quanity;
            MS_cost += 13;
            MS_price += 14;
            document.getElementById("MS-Total").innerHTML = "₹"+String(MS_cost);
            break;
        case "Yippee-large":
            // updateProductUI("Yippee-large");
            YL_quanity += 1;
            document.getElementById("YL-quanity").value = YL_quanity;
            YL_cost += 95;
            YL_price += 112;
            document.getElementById("YL-Total").innerHTML ="₹"+String( YL_cost);
            break;
        case "Yippie-small":
            // updateProductUI("Yippee-small");
            YS_quanity += 1;
            document.getElementById("YS-quanity").value = YS_quanity;
            YS_cost += 12;
            YS_price += 13;
            document.getElementById("YS-Total").innerHTML = "₹"+String(YS_cost);
            break;
        default:
            alert("Unknown product name: " + productName);
            console.log("Unknown product name: " + productName);
    }
    subTotalUpdate();

    // updateProductUI(productName);
}

function subTotalUpdate() {
    document.getElementById("SubTotal").innerHTML = "₹"+String(ML_cost + MS_cost + YL_cost + YS_cost);
    sessionStorage.setItem("SubTotal", String(ML_cost + MS_cost + YL_cost + YS_cost));
    totalUpdate();
}


function totalUpdate()
{
    if(ML_cost + MS_cost + YL_cost + YS_cost > 40)
    {
        document.getElementById("Total").innerHTML = "₹ "+String(ML_cost + MS_cost + YL_cost + YS_cost - 30 );
        sessionStorage.setItem("Total", String(ML_cost + MS_cost + YL_cost + YS_cost - 30));
    }
    else
    {
        document.getElementById("Total").innerHTML = "₹ "+String(ML_cost + MS_cost + YL_cost + YS_cost);
        sessionStorage.setItem("Total", String(ML_cost + MS_cost + YL_cost + YS_cost));
    }
}
function removeItem(item) {
    switch (item) {
        case "ML":
            if (document.getElementById("ML-quanity").value > 0) {
                document.getElementById("ML-quanity").value -= 1;
                ML_cost -= 101;
                ML_price -= 112;
                document.getElementById("ML-Total").innerHTML = "₹"+String(ML_cost);
            }
            break;
        case "MS":
            if (document.getElementById("MS-quanity").value > 0) {
                document.getElementById("MS-quanity").value -= 1;
                MS_cost -= 13;
                MS_price -= 14;
                document.getElementById("MS-Total").innerHTML = "₹"+String(MS_cost);
            }
            break;
        case "YL":
            if (document.getElementById("YL-quanity").value > 0) {
                document.getElementById("YL-quanity").value -= 1;
                YL_cost -= 95;
                YL_price -= 112;
                document.getElementById("YL-Total").innerHTML = "₹"+String(YL_cost);
            }
            break;
        case "YS":
            if (document.getElementById("YS-quanity").value > 0) {
                document.getElementById("YS-quanity").value -= 1;
                YS_cost -= 12;
                YS_price -= 13;
                document.getElementById("YS-Total").innerHTML = "₹"+String(YS_cost);
            }
            break;
    }
    subTotalUpdate();
    discountUpdate();
}