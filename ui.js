class animator{
    page;
    container;
    currentPage;
    constructor(containerId){
        //Tentukan container halaman
        this.container = document.getElementById(containerId);
        //Dapatkan template halaman
        this.page = document.getElementsByTagName("template");
    }
    pageSelect(slideId,pageSpecialFunc){
        //Dapatkan template
        try {
            var child = this.page[slideId].content.cloneNode(true);
        } catch (error) {
            //Bila gagal log page not found
            console.log("Page not found");
            return false;
        }
        if(this.currentPage != undefined){
            //kalau container tidak kosong, kosongkan dulu
            this.container.removeChild(this.currentPage);
        }
        //Buatkan subcontainer untuk laman
        var miniContainer = document.createElement("section");
        miniContainer.className = "container";
        miniContainer.appendChild(child);
        //Bila ada special function  jalankan special function
        this.currentPage = this.container.appendChild(miniContainer);
        if(pageSpecialFunc != null){
            pageSpecialFunc();
        }
    }
    
}