const request = require('request-promise')
const body = require('body-parser')
const app = require('express')()
const cors = require('cors')
app.use(cors())
app.use(body.json())


// Test run

/**app.post('/state_hotels', (req, res) => {
	
	stateHotelsAndRestaurants(req.body.name,'hotels',res)
})

app.post('/nearby_hotels', (req, res) => {
	console.log(req.body.keyword)
	console.log("after keyword")
	nearbystateHotelsAndRestaurants(req.body.lat,req.body.lng,req.body.keyword,res)

})

app.post('/state_car_rentals', (req, res) => {
	
	stateHotelsAndRestaurants(req.body.name,'car rentals',res)
})

app.post('/nearby_car_rentals', (req, res) => {
	console.log(req.body.keyword)
	console.log("after keyword")
	nearbystateHotelsAndRestaurants(req.body.lat,req.body.lng,req.body.keyword,res)

})

**/


app.post('/state_restaurants', (req, res) => {
	stateHotelsAndRestaurants(req.body.name,req.body.searchOption,res)

})

app.post('/nearby_restaurants', (req, res) => {
	nearbystateHotelsAndRestaurants(req.body.lat,req.body.lng,req.body.keyword,res)

})

app.post('/place_details', (req, res) => {

	getPlaceDetails(req.body.id,res)

})

app.post('/place_token', (req, res) => {
	console.log(req.body.token)
	placeToken("textsearch",req.body.token,res)

})

// reusable functions
const stateHotelsAndRestaurants = async (stateAndCity, place,res) => {
		var parsedResult;
		try{
			const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place} in ${stateAndCity}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`
			const stateHotelsOrRestauarants = await request(url)
			console.log(stateHotelsOrRestauarants.next_page_token)
			res.send(stateHotelsOrRestauarants)
			
		} catch (error){
			console.log(error)
		}


	}

const nearbystateHotelsAndRestaurants = async (lat,long,keyword, res) => {
	
		try{
			const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=5000&keyword=${keyword}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`
			const nearbystateHotelsOrRestauarants = await request(url)
			res.send(nearbystateHotelsOrRestauarants)
			
			
		} catch (error){
			console.log(error)
		}


	}


const getPlaceDetails = async (id, res) => {
		try{

		const data = await request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`)
		    res.send(data)
	}catch(error){
		console.log(error)
	}


	}
const placeToken = async (keyword, token,res) => {
	
	try{
		const url = `https://maps.googleapis.com/maps/api/place/${keyword}/json?pagetoken=${token}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`
		const data = await request(url)
		console.log(data)
		res.send(data)
	   }catch(error)
	   
	   {
		console.log(error)
	}



	}





app.listen(443, () => {
	console.log('app is listening')
})