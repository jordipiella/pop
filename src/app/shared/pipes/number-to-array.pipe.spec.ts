import { NumberToArrayPipe } from './number-to-array.pipe';

describe('NumberToArrayPipe', () => {
  describe('#transform', () => {
    it('should return [0, 1, 2, 3, 4]', () => {
      const pipe: NumberToArrayPipe = new NumberToArrayPipe();
      expect(pipe.transform(5)).toEqual([0, 1, 2, 3, 4]);
      expect(pipe.transform(0)).toEqual([]);
      expect(pipe.transform(2)).toEqual([0, 1]);
    });
  });
});
