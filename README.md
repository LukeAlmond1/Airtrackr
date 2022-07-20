## Airtrackr Summary

![This is an image](/media/summary/a_home.jpg)

### Home Page ~ User enters flight details

This page is where users can input their flight details to see further information about the locations, airports and flight routes associated with their flights. The date input fields ensure that, upon a user clicking the discover details button, the return date is not before the departure date as to allow our api routes to fetch data effectively. The airports and airline inputs have a built-in auto suggest search feature which suggests search queries every time the respective input fields change.

![This is an image](/media/summary/a_errorH.jpg)


### Home Page ~ Incorrect date range

This pop up message ensures that the user selects both their departure & return flights to give our backend routes enough information to make any further api requests. Upon selection, the flight id of the currently selected flight gets stored in a state variable in which gets attached to the post request when a user then clicks to see more details on their selected flights.
