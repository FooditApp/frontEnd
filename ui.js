class animator{
    slide;
    constructor(){
        this.slide = document.getElementsByClassName("container");
    }
    slideSelect(){
        for (var i = 0; i < this.slide.length; i++) {
            console.log(this.slideId[i].id); //second console output
        }
    }
}