import challenge from './challenge.json';
import { getData } from './utils';

describe('getData', () => {
  it('should return an array', () => {
    const data = getData(challenge);
    console.log(data);
  });
});
