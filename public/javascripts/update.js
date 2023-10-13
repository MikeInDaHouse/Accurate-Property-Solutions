const axios = require('axios');

const apiKey = '36eb386ec0dbb446a8b6e7db91efb4d1-us21';
const audinceId = 'f87f4fb06d';
const constactId = '87c7bf0ddb5873bd8532c862aa75d900&';


const apiUrl = `https://us21.api.mailchimp.com/3.0/lists/${audinceId}/members/${constactId}`;

const updateContact = async () => {
    try{
        const response = await axios.patch(
            apiUrl, 
            {
                merge_fields: {
                    email_address: `${email}`,
                    FNAME: `${firstName}`
                }
                },
                {
                headers: {
                    Authorization: "auth 36eb386ec0dbb446a8b6e7db91efb4d1-us21"
                }
            }
        );
        
 console.log("Contact updated sucessfully:", response.data);
    } catch (error) {
        console.log (
            "Error updating contact:",
            error.response ? error.response.data : error.message
        );
    }
};


updateContact();
