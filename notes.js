

/* 



PENDIENTES:

Filters in the keys CSS background image causes the div keys to lightly flicker when an event occurs. May need to not use filters at all.

Usa photodhop para arreglar el color de la imagen ya ya no tener que usar filtros de CSS.


consider disabling REC button while a sample is playing.


1. CONSIDER USING EVENT.CODE INSTEAD OF EVET.KEY TO GET RID OF THE NEED TO UPPER CASE AND STUFF!!

NOTICE THAT THE EVENT LISTENERS DON NEED TO CHANGE THEIR FILTERS! YOU CAN FILTER BY EVENT.KEY TO KEEP THAT EASY SINCE YOU'RE PASSING THE WHOLE EVENT ANYWAY

CONSIDER REFACTOR:
Using evt.code instead of event.key would eliminate the need of uppercasing. It would require to change the ids of the html button elements and the cases of the switch statement of the
playSound() function. 'Q' would become 'KeyQ' no matter if caps was on or off. Just note that event.code may return unwanted values on other keyboard layouts, so in such case re read the docs. stick to letters and numbers, no symbols.


Hacer un refactor para que se vea bien.

add listener to R key to start stop recording
add listener to P key to start stop playback

ideally user wouldnt need to touch record button to stop recording, its cumbersome. Try to later refactor so play button does that but without falling into
earlier shortcomings.


For the setTimoeut I only needed to subtract the timestamp of the first object to all others instead of having to subtract the timestamp of the immediate previous object to each object
because even though im doing the playback in a for loop, setTimeout seems to "attach" to every object in the iteration no matter its timestamp, so setTimeout was playing 
whichevers object ended up with the smaller timestamp first (an in that order) instead of playing each individaul object with the timestamp as a time difference between each.

*/
