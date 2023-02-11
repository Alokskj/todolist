//jshint esversion:6

exports.getDate = function() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function () {

  const today = new Date();

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.greet = ()=>{
let timeNow = new Date().getHours();

let greeting;
if(timeNow >= 5 && timeNow < 12){
  greeting = "Good Morning";
  return greeting
}
else if(timeNow >= 12 && timeNow < 15 ){
  greeting = "Good Afternoon";
  return greeting
}
else if(timeNow >=15 && timeNow < 19 ){
  greeting = "Good Evening"
  return greeting
}
else{
  greeting = "Good Night"
  return greeting
}
 

}

