
  function getDataASync(url, result) {

    var REQ = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var req = new REQ();
     
    req.open("GET", url, true);
    
    req.onload = function() {
        result =  JSON.parse(this.responseText); 
        console.log(result);
    }
        
    req.onerror = function() {
      console.log(this.status+':'+this.statusText);
    }

    req.send();
  }