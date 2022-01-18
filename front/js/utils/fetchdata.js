//* Fetch Data from the DB
const fetchData = async (config) => {
    try{
        const response = await fetch(config.host+'/api/products');
    
        if(!response.ok) throw (e)

        return response.json()
    }
    catch(e){
        console.log(e);
    }
}