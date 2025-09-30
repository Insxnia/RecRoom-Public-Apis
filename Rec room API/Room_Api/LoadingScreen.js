if (!window.location.href.includes("rec.net")) {
    alert("Not in RecNet! https://rec.net")
    throw new Error("Not in RecNet!")
}
 

auth_storage = JSON.parse(localStorage.getItem("na_current_user_session"))
if (!auth_storage) {
    alert("Not logged in!")
    throw new Error("Haven't logged in!")
}

AToken = auth_storage.accessToken

acc_token = "Bearer " + (AToken)

roomID = prompt("Please enter the Room ID!")

img = prompt("Please enter the img.rec.net link!")

img_name = img.split("/").at(-1).split("?").at(0)

r = await fetch("https://rooms.rec.net/rooms/${roomID}/loadscreen", {
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": acc_token
    },
    "body": "imageName=" + img_name,
    "method": "PUT"})

    is_json = r.headers.get('content-type').includes("application/json")
if (!is_json) {
    alert("You didn't input a valid link!")
    throw new Error("Didn't input a valid link!")}

    r_json = await r.json()
alert("Success: " + r_json.success + "\nError: " + r_json.error)

