export class Modal{
    constructor(contentId, fallbackTxt){
        this.fallbackTxt = fallbackTxt; 
        this.contentTempEl = document.getElementById(contentId); 
        this.modalTempEl = document.querySelector('#modal-template'); 

    }

    show(){
        if ('content' in document.createElement('template')){
            const modalElContainer = document.importNode(this.modalTempEl.content, true); 
            this.modalEl = modalElContainer.querySelector('.modal'); 
            this.modalBackdropEl =  modalElContainer.querySelector('.backdrop'); 
            const contentEl = document.importNode(this.contentTempEl.content, true); 

            this.modalEl.appendChild(contentEl); 
            document.body.insertAdjacentElement('afterbegin', this.modalEl); 
            document.body.insertAdjacentElement('afterbegin', this.modalBackdropEl); 
        }   
        else{
            // fall back code 
            alert(this.fallbackTxt); 
        }
    
    }

    hide(){
        if (this.modalEl){
            document.body.removeChild(this.modalEl); 
            document.body.removeChild(this.modalBackdropEl);
            this.modalEl = null; 
            this.modalBackdropEl = null; 
        }

    };
}