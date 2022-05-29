import {Map} from './UI/Map.js'
class RenderLocation{
    constructor(coordinates, address){
        new Map(coordinates); 

        const headerTitleEl = document.querySelector('header h1'); 
        headerTitleEl.textContent = address; 
    }
}

const url = new URL(location.href); 
const queryParams = url.searchParams; 
const coords = {
    lat: +queryParams.get('lat'), 
    lng: +queryParams.get('lng')
}

console.log(url); 

const address = queryParams.get('address'); 

console.log('address', address); 
console.log('coords', coords);
new RenderLocation(coords, address);

