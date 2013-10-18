start = results:token+ { return results.reduce(function(previousValue,
currentValue, index, array) { return previousValue + currentValue; })}
token = unit_integer / just_integer
/* this seems awkward */
unit_integer = num:integer whitespace* unit:units whitespace* { return num * unit; }
just_integer = integer
whitespace = [ ]
integer = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
/* this seems like a stupid way */ 
units = 
    "minutes"i { return 60;     }
  / "mins"i    { return 60;     }
  / "min"i     { return 60;     }
  / "seconds"i { return 1;      }
  / "second"i { return 1;      }
  / "secs"i    { return 1;      }
  / "sec"i     { return 1;      }
  / "hours"i   { return 3600;   }
  / "hour"i    { return 3600;   }
  / "days"i    { return 86400;  }
  / "day"i     { return 86400;  }
  / "weeks"i   { return 604800; }
  / "week"i    { return 604800; }
