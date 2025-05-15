import axios from 'axios';

const fetchHeadloadData = async () => {
    try {
        const response = await axios.get('https://doctorapi.medonext.com/Api/HMS/GetAllHeadload');
        const result = await JSON.parse(response.data);

        return {       
         
            relations: result.Table.map(item => ({ CID: item.CID, CNAME: item.CNAME })),
           
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default fetchHeadloadData;



             
 
