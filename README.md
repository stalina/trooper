Trooper
=================


Launch a trooper to a planet

Launch
-------

`node trooper.js`

it uses 2 environments variables :
 * PLANET_URL : which is the planet URL where to launch the trooper
 * TROOPER_NAME : which is the name of your trooper
 * SHIP_IMG : which is the url of the image that represents the trooper
    > The image should be a png file  
    Which size is 38x28  
    Seen from above  
    With a transparent background
    

Life
-------
When launched the trooper is autonomous, you have nothing to do, he has its order to follow : "Tear down the death star".

You can check its image by calling the URL : `http://<host>:1337/`

But your trooper can die if someone calls the route `/die` (Sorry for your loss)



####Good luck and may the force be with you !