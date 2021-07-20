import axios from 'axios';
import GetCashbackTotal from '../../../../src/modules/reports/services/GetCashbackTotal';

let getCashback: GetCashbackTotal;

describe('GetCashbackTotal', () => {
    beforeEach(() => {
        getCashback = new GetCashbackTotal();
    });

    it('should be able get cashback total', async () => {
        const response = {
            data: {
                body: {
                    credit: 2646
                }
            }
        };

        jest.spyOn(axios, "get").mockImplementation(() => (Promise.resolve(response)));

        const result = await getCashback.execute('99999999999');


        expect(result).toEqual(2646);
    }); 
    
    it('should be able get cashback total equal 0 when no response', async () => {
        const response = {};

        jest.spyOn(axios, "get").mockImplementation(() => (Promise.resolve(response)));

        const result = await getCashback.execute('99999999999');


        expect(result).toEqual(0);
    }); 
});