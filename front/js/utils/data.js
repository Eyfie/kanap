//* Fetch Data from the DB
const fetchData = async (config,url) => {
    try{
        const response = await fetch(config.host+url);
    
        if(!response.ok) throw response;

        return response.json()
    }
    catch(e){

        console.log(e);
        if(e.status == 404) {
           return e.status; 
        }
        throw Error(e.status ? `${e.status} ${e.statusText}` : 'Le serveur ne répond pas');
    }
}


//* Post data for order
const postData = async (config,url,order) => {
    try{

        const response = await fetch(config.host + url,{
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(order)
        });
        
        
        if(!response.ok) throw response;

        return response.json();
    }
    catch(e){
        Swal.fire('Le serveur ne répond pas');
        throw Error(e.status ? `${e.status} ${e.statusText}` : 'Le serveur ne répond pas');
    }
}