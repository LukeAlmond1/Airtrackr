## Airtrackr Summary

![This is an image](/media/summary/a_home.jpg)

### Home Page ~ User enters flight details
-------------------------------------------------------
This page is where users can input their flight details to see further information about the locations, airports and flight routes associated with their flights. The date input fields ensure that, upon a user clicking the discover details button, the return date is not before the departure date as to allow our api routes to fetch data effectively. The airports and airline inputs have a built-in auto suggest search feature which suggests search queries every time the respective input fields change.

&nbsp;
&nbsp;

![This is an image](/media/summary/a_errorH.jpg)

### Home Page ~ Incorrect date range
-------------------------------------------------------
This pop up message ensures that the user selects both their departure & return flights to give our backend routes enough information to make any further api requests. Upon selection, the flight id of the currently selected flight gets stored in a state variable in which gets attached to the post request when a user then clicks to see more details on their selected flights.

&nbsp;
&nbsp;

![This is an image](/media/summary/a_details.jpg)

### Details Page ~ Displaying flight data
-------------------------------------------------------
This page displays the relevant details associated with a user's flight ordered via three tabs - Airport, Location and Flight. The data that is rendered to the UI is fetched via a myriad of different API requests on the backend, a few requests which make use of google places API endpoints. Furthermore, the user can also toggle between their departure flight or return flight to see data with respect to their flight's context.

&nbsp;
&nbsp;

![This is an image](/media/summary/a_fetch.jpg)

### Loading Component ~ Fetching data from the backend
-------------------------------------------------------
This loading component is designed to render upon making requests to the backend. The requested progress is mapped in the components state to which then determines the css width value of the progress bar. Once the request has been resolved, the loading component waits a few seconds, controlled using the built in setTimeout javascript function, before unmounting from the dom
