import { ReverseDatePipe } from './reverse-date.pipe';

describe('RevertDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseDatePipe();
    expect(pipe).toBeTruthy();
  });
});
