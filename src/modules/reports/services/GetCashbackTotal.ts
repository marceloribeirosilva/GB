import axios from 'axios';

class GetCashbackTotal {
    public async execute(cpf: string): Promise<number> {
        let total = 0;        
        const response = await axios.get(`https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`, 
            {headers: {token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'}});

        if (response && response.data && response.data.body) {
            total = response.data.body.credit;
        }
        return total
    }    
}

export default GetCashbackTotal;