import {Modal} from './UI/Modal.js';
import {Map} from './UI/Map.js' ; 
import {getCoordFromAddress, getAddressFromCoord} from './Utility/Location.js'; 
class PlaceLocation {
    constructor(){
        this.findPlaceForm = document.querySelector("form"); 
        this.getLocationBtn = document.querySelector("#locate-btn"); 
        this.sharePLaceBtn = document.getElementById('share-btn');
        this.shareLinkInput = document.getElementById('share-link'); 

        this.getLocationBtn.addEventListener('click', this.getLocationHandler.bind(this)); 
        this.findPlaceForm.addEventListener('submit', this.findPlaceHandler.bind(this)); 
        this.sharePLaceBtn.addEventListener('click', this.shareLocation.bind(this)); 

    }

    shareLocation(){
        if (!navigator.clipboard){
             this.shareLinkInput.select(); 
            return; 
        }

        navigator.clipboard.writeText(this.shareLinkInput.value)
        .then(()=> alert("Copied to clipboard"))
        .catch(err => {
            console.log(err);
            this.shareLinkInput.select(); });
    }

    selectedLocation(coords, address){
        // console.log(coords, "aaa"); 
        if(this.map){
            this.map.render(coords); 
        }else{
            this.map = new Map(coords); 

        }
        this.sharePLaceBtn.disabled = false; 
        
        this.shareLinkInput.value = `${location.origin}/dist/my-place?address=${encodeURI(address)}&lat=${coords.lat}&lng=${coords.lng}`;


      
    }
    
    getLocationHandler() {
        if (!navigator.geolocation){
            alert('Getting current location is available on your web version - Please use updated browser'); 
            return; 
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait'); 
        modal.show(); 
        navigator.geolocation.getCurrentPosition(async success => { 
            modal.hide(); 
            const coordinates = {
                lat: success.coords.latitude, 
                lng: success.coords.longitude, 
            }; 
            const address = await getAddressFromCoord(coordinates);
            modal.hide(); 
            this.selectedLocation(coordinates, address); 
            console.log(coordinates); 
        }, 
            error => { 
                modal.hide(); 
                alert('Could not locate your address, please enter it manually')}
        )
    }

    async findPlaceHandler(event){
        event.preventDefault(); 
        const address = event.target.querySelector('input').value; 
        if (!address || address.trim().length === 0){
            alert('Please enter a valid address'); 
            return; 
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait');

        modal.show(); 
        try{
            const coordinates = await getCoordFromAddress(address); 
            this.selectedLocation(coordinates, address); 
        }catch(error) {
            alert(error.message); 
        }
        modal.hide(); 
       

    }

}

new PlaceLocation(); 