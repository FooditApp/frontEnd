class userAgent{
    sessionId;
    foodCourtId;
    tableId;
    constructor(){
        var init = new Promise(function(resolve, reject){userAgent.universalXmlReq(resolve,reject,"",null,null)});
        init.then(
            (value)=>{
                this.sessionId = value;
            }
        )
        init.catch(
            (error)=>{
                console.log(error);
            }
        )
    }
    static universalXmlReq(resolve, reject, target, form, extra){
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
                userGet.animClear();
                var responseText = JSON.parse(this.responseText)
                if(responseText['status'] == 200){
                    resolve(responseText['msg']);
                } else {
                    reject(responseText['error']);
                }
            }
        };
        xhttp.open("POST", target, true);
        xhttp.send(formData);
    }
}