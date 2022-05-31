export class Map{ 
    constructor(coords){
        
        this.render(coords);  

    }
    render(coords){

        console.log(coords, coords.lat); 

        if (!google){
            alert('Could not load map - try again'); 
            return; 

        }
        const map = new google.maps.Map(document.getElementById('map'),
         {center: {
             lat: coords.lat,
             lng: coords.lng
         }, 
            zoom: 16});

        new google.maps.Marker({position: coords,
        map: map})

    }

}