Trooper
=================


Launch a trooper to a planet  
Related to https://github.com/ymatagne/ConquerirLeMonde 

Launch
-------

`node trooper.js`

it uses some environments variables :
 * TROOPER_HOST : which is the host of your trooper (most likely your IP address)
 * TROOPER_PORT : which is the port where your trooper is deployed
 * PLANET_HOST : which is the planet host where to launch the trooper
 * PLANET_PORT : which is the planet port where to launch the trooper
 * TROOPER_NAME : which is the name of your trooper
 * SPACESHIP : which is the space shipyou choose to launch
    

Life
-------
When launched the trooper is autonomous, you have nothing to do, he has its order to follow : "Tear down the death star".

Your trooper can die if someone calls the route `/die` (Sorry for your loss)



####Good luck and may the force be with you !