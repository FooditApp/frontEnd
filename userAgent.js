class userAgent{
    sessionId;
    foodCourtId;
    tableId;
    animator;
    merchantAndProduct = [
        {merchantName:"SellerName1",products:[{id:1,productName:"Bakso",productImage:null,productDescription:"Baksoka",productRating:5,productPrice:5000}]},
        {merchantName:"SellerName1",products:[{id:1,productName:"Bakso",productImage:null,productDescription:"Baksoka",productRating:5,productPrice:5000}]},
        {merchantName:"SellerName1",products:[{id:1,productName:"Bakso",productImage:null,productDescription:"Baksoka",productRating:5,productPrice:5000}]},
        {merchantName:"SellerName1",products:[{id:1,productName:"Bakso",productImage:null,productDescription:"Baksoka",productRating:5,productPrice:5000}]},
        {merchantName:"SellerName1",products:[{id:1,productName:"Bakso",productImage:null,productDescription:"Baksoka",productRating:5,productPrice:5000}]},
    ];
    cart;
    constructor(){
        //inisialisasi animator;
        this.animator = new animator("container");
        //Tambahkan event listener kepada hash di url dan bila ada perubahan panggil fungsi page handler
        window.addEventListener('hashchange', (e)=>{this.pageHandler(location.hash.replace("#",""))});
        

        //Dapatkan List produk
        var getMerchant = new Promise((resolve, reject)=>{
            this.universalXmlReq(resolve,reject,"https://api-backend-production-2003.up.railway.app/api/v1/foodit/location/1",null,null)
        });
        getMerchant.then(
            (value)=>{
                //Bila berhasil maka set produk dan merchan
                this.merchantAndProduct = value;
                //Ganti hash ke main dan render laman
                location.hash = "main";
                this.pageHandler("main");
            }
        )
        getMerchant.catch(
            (error)=>{
                //Kalau error log error
                console.log(error);
            }
        )
        
    }
    //Test
    test(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("demo").innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", "https://api-backend-production-2003.up.railway.app/api/v1/foodit/location/1", true);
        xhttp.send();
    }
    /**
     * Handler Rendering LAmanm
     * @param {String} slideRaw 
     */
    pageHandler(slideRaw){
        //Slide special function
        //Pisahkan Hash dan param
        var param = {};
        var slideRaw = slideRaw.split("?");
        var slideId = slideRaw[0];
        //Buatkan objek param
        for (let index = 1; index < slideRaw.length; index++) {
            const element = slideRaw[index].split("=");
            param[element[0]] = element[1];
        }
        console.log(param.site);
        //Spesial Fungsi untuk halaman
        switch (slideId) {
            case "main":
                var that = this;
                this.animator.pageSelect(slideId,function(){
                    that.loadMerchant();
                });
                break;
            case "detail":
                var that = this;
                this.animator.pageSelect(slideId,function(){
                    that.loadDetail(param.param);
                });
                break;
            default:
                //Default jiga tidak ada special function
                if(this.animator.pageSelect(slideId) === false){
                    location.hash = "error";
                }
                break;
        }
    }
    /**
     * Muat Laman Detail
     * @param {String} index Index Item 
     */
    loadDetail(index){
        //Variable untuk item yg dipilih
        var product;
        //Keterangan ITem
        var detailHeader = document.getElementById("detailHeader");
        var detailDesc = document.getElementById("detailDesc");
        var detailPrice = document.getElementById("detailPrice");
        var detailImage = document.getElementById("detailImage");
        console.log(index);
        //Dapatkan item dari pilihan
        this.merchantAndProduct.forEach((element)=>{
            element.products.forEach((element)=>{
                if(index == element.id){
                    product = element;
                }
            })
        })
        //Render Gambar
        if(!product.productImage == null){
            //Kalau null maka pakai dummy
            detailImage.src = "/asset/image/image-files.svg";
        } else {
            detailImage.src = product.productImage;
        }
        //Pasangkan nilai
        detailHeader.innerHTML = product.productName;
        detailDesc.innerHTML = product.productDescription;
        detailPrice.innerHTML = "Rp. "+product.productPrice;
    }
    /**
     * Muat Konten Laman Main
     */
    loadMerchant(){
        //Dapatkan Container Selector Merchant 1
        var selectMerchantContainer = document.getElementById("bannerSroll2");
        //Dapatkan Container Produk
        var productContainer = document.getElementById("productContainer");
        //Dapatkan Container Selector Float
        var selectMerchantFloatContainer = document.getElementById("floatMenu");
        this.merchantAndProduct.forEach((element,index)=>{
            //Masukkan tombol select merchant ke selector merchant 1
            var selectMerchant = document.createElement("section");
            selectMerchant.className = "selectMerchant";
            selectMerchant.innerHTML = element.merchantName;
            selectMerchantContainer.appendChild(selectMerchant);
            //Masukkan tombol select merchant ke selector merchant float
            var selectMerchantFloat = document.createElement("section");
            selectMerchantFloat.className = "element100 floatMenuMerchant";
            selectMerchantFloat.style.fontWeight = "600";
            selectMerchantFloat.innerHTML = element.merchantName;
            selectMerchantFloatContainer.appendChild(selectMerchantFloat);

            //Buatkan container merchat dengan index
            var merchant = document.createElement("section");
            merchant.id = index;
            //Tambahkan eventlistiner klik ke tombol selector merchant dan saat klik scroll ke posisi
            selectMerchant.addEventListener("click",function () {
                merchant.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
            });
            selectMerchantFloat.addEventListener("click",function () {
                merchant.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
                document.getElementById("floatMenuContainer").className = "floatMenuContainerHidden";
            });
            //Buat header container merchant 
            var merchantHeaderC = document.createElement("section");
            merchantHeaderC.className = "element100";
            merchantHeaderC.style.fontSize = "24px";
            merchantHeaderC.style.fontWeight = "600";
            merchantHeaderC.style.color = "var(--fooderGreen)";
            //Buat Text Header
            var merchantHeaderP = document.createElement("p");
            merchantHeaderP.innerHTML = element.merchantName;
            //Tambahkan ke container
            merchantHeaderC.appendChild(merchantHeaderP);
            merchant.appendChild(merchantHeaderC);
            productContainer.appendChild(merchant);
            
            //Render tiap produk di merchant 
            element.products.forEach((element,index)=>{
                //Buat product container 
                var productContainerEl = document.createElement("section");
                productContainerEl.className = "element100";
                //Buat Holder Product
                var productEl = document.createElement("section");
                productEl.className = "product100";
                //Buat flex product kiri untuk foto dan ket
                var productElFlex = document.createElement("section");
                productElFlex.style.display = "flex";
                //Render Gambar item
                var productImage = document.createElement("img");
                if(element.productImage == null){
                    //Bila blm di set maka pakai image dummy
                    productImage.src = "/asset/image/image-files.svg";
                } else {
                    productImage.src = element.productImage;
                }
                productImage.style.aspectRatio = "1/1";
                productImage.style.objectFit = "cover";
                productImage.style.borderRadius = "10px 0 0 10px";
                //Buat section untuk ket item
                var productDesc = document.createElement("section");
                productDesc.className = "productDesc";
                //Nama item
                var productName = document.createElement("p");
                productName.innerHTML = element.productName;
                productName.style.fontWeight = "600";
                //Harga
                var productPrice = document.createElement("p");
                productPrice.innerHTML = "Rp. "+element.productPrice;
                productPrice.style.fontWeight = "600";
                //Render Bintang Rating
                var productRating = document.createElement("section");
                for (let index = 0; index < element.productRating; index++) {
                    var starIcon = document.createElement("img");
                    starIcon.src = "/asset/image/star.svg";
                    productRating.appendChild(starIcon);
                }
                //Tombol add cart
                var addToCartBtn = document.createElement("img");
                addToCartBtn.src = "/asset/image/add-one.svg";
                addToCartBtn.style.width = "30px";
                addToCartBtn.style.height = "30px";
                addToCartBtn.style.padding = "10px";
                addToCartBtn.style.alignSelf = "flex-end";
                //Event saat diklik ke page detail
                addToCartBtn.addEventListener("click",function(){
                    location.hash = "#detail?param="+element.id;
                });
                
                //Dipasangkan
                productDesc.appendChild(productName);
                productDesc.appendChild(productRating);
                productDesc.appendChild(productPrice);
                productElFlex.appendChild(productImage);
                productElFlex.appendChild(productDesc);
                productEl.appendChild(productElFlex);
                productEl.appendChild(addToCartBtn);
                productContainerEl.appendChild(productEl);
                merchant.appendChild(productContainerEl);


            })

        });

    }
    /**
     * Standart Fungsi untuk melakukan AJAX Request
     * @param {*} resolve Fungsi saat resolve
     * @param {*} reject Fungsi Reject
     * @param {*} target URL Target
     * @param {*} form Form Data
     * @param {*} extra Extra Parameter
     */
    universalXmlReq(resolve, reject, target, form, extra){
        var xhttp = new XMLHttpRequest;
        xhttp.timeout = 20000;
        xhttp.ontimeout = (e) => {
            reject("Request Timeout");
        }
        xhttp.onerror = (e) => {
            reject(e.type+" : Please Check Your Internet Connection");
        }

        var formData;
        if(form != undefined && form != null){
            formData = new FormData(form);
        } else {
            formData = new FormData();
        }
        if(extra != undefined && extra != null){
            for (const [key, value] of Object.entries(extra)) {
                formData.append(key, value);
            }   
        }
        xhttp.onreadystatechange =  function () {
            if(this.readyState == 4 && this.status == 200){
                var responseText = JSON.parse(this.responseText)
                resolve(responseText);
            }
        };
        xhttp.open("POST", target, true);
        xhttp.send(formData);
    }
}