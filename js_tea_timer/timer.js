var begin_red = 243;
var begin_green = 234;
var begin_blue = 228;
var end_red = 92;
var end_green = 47;
var end_blue = 47;
var delta_red = end_red - begin_red;
var delta_green = end_green - begin_green;
var delta_blue = end_blue - begin_blue;

function urldecode(str) {
  return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function get_seconds() {
  var query = location.search.substring(1).toLowerCase();
  try {
    var seconds = duration_parser.parse(urldecode(query));
    return seconds;
  } catch (error) {
    return 0;
  }
}

var start;
var stop;
var timestep;
var timestep_desired = 100;
var fudge = -350;
var last;

var seconds = get_seconds();
if (0 == seconds) {
  alert("You did something that I didn't like and I gave up. If you did something valid, I'm super-duper sorry, please write me and tell me what you did.");
} else {
  start = +(new Date());
  stop = start + fudge + (1000 * seconds);
  last = start - timestep_desired;
  timestep = 480;
  update();
}

function progress(tick) {
  if (tick > stop) return 1.0;
  if (tick < start) return 0.0;
  else {
    // TODO
    // stop - start really shouldn't be 0, but if it is, whatever, let the world end
    return (tick - start) / (stop - start);
  }
}                                       

function stemmer(unit, qty) {
  // i r lazy
  if (qty == 0) return "";
  if (qty == 1) return " 1 " + unit;
  return " " + qty + " " + unit + "s";
}

function set_strings(string) {
  document.getElementById('msr').innerHTML = string;
  document.title = string;
}

function left(tick) {
  // because it's totally worth doing all of this math
  var seconds = Math.floor((stop - tick) / 1000);
  var seconds_remaining = seconds % 60;
  var minutes = Math.floor(seconds / 60);
  var minutes_remaining = minutes % 60;
  var hours = Math.floor(minutes / 60);
  var hours_remaining = hours % 24;
  var days = Math.floor(hours / 24);
  var days_remaining = days % 7;
  // stopping at weeks, sorry kids
  var weeks = Math.floor(days / 7);
  set_strings((0 == seconds) ? "0 seconds" : (stemmer("week",
        weeks) + stemmer("day", days_remaining) + stemmer("hour",
          hours_remaining) + stemmer("minute", minutes_remaining) +
      stemmer("second", seconds_remaining))); 
}

function update() {
  // do update
  var tick = +(new Date());

  // sloppy jitter correction, probably prone to doing bad things
  var time_since_last_tick = tick - last;
  last = tick;
  var delta = time_since_last_tick - timestep_desired;
  timestep -= delta;
  if (timestep < 50) timestep = 50;
  if (timestep > timestep_desired) timestep = timestep_desired;

  if (tick > stop) {
    set_strings("Time's up!");
    alert("Time's up!");
    return;
  }

  var f = progress(tick);
  left(tick);

  var red = begin_red + f * delta_red;
  var green = begin_green + f * delta_green;
  var blue = begin_blue + f * delta_blue;
  document.body.style.backgroundColor = "rgb(" + Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + ")";

  setTimeout("update()", timestep);
}

function popup() {
  alert("Tea is ready.");
}
