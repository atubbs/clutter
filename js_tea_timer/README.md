all-js tea timer
================

I had a misguided desire to make an all-JavaScript tea timer after having the
flash-based timer I used regularly [steep.it](http://steep.it/) crash on me. Of
course, I decided to do this without knowing anything about JavaScript. So,
it's an ugly little urchin of a thing that's not particularly well made, but it
works:

* [qule.org/timer/?5 minutes 20 seconds](http://qule.org/timer/?5 minutes 20 seconds)
* [qule.org/timer/?3minutes](http://qule.org/timer/?3minutes)

I used [PEG.js](http://pegjs.majda.cz/) to parse the input into seconds, because writing the parser by
hand seemed like it would end in certain failure. 
