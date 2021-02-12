import getHandler from '../src/getHandler';

const page = 5;
const expectedIndex = page - 1;

const mockReq = { session: { formData: { data: 'test' } }, url: `/testpath/${page}` };
const expectedResult = { formIndex: expectedIndex, formData: mockReq.session.formData, validPage: true };

const mockCallback = formIndex => ({ formIndex });

describe('getHandler', () => {
  it('Gets correct index from page in url', () => {
    const { formIndex } = getHandler(10, mockReq);
    expect(formIndex).toBe(expectedIndex);
  });

  it('returns false for validPage if invalid', () => {
    let { validPage } = getHandler(4, mockReq);
    expect(validPage).toBe(false);

    const newReq = { ...mockReq };
    newReq.url = `/testPath/0`;
    ({ validPage } = getHandler(4, mockReq));
    expect(validPage).toBe(false);

    newReq.url = `/testPath/test`;
    ({ validPage } = getHandler(4, mockReq));
    expect(validPage).toBe(false);

    newReq.url = `/testPath/1.43`;
    ({ validPage } = getHandler(4, mockReq));
    expect(validPage).toBe(false);
  });

  it('Returns session data if no callback provided', () => {
    const result = getHandler(10, mockReq);
    expect(result).toEqual(expectedResult);
  });

  it('Calls callback with formIndex argument, and uses returned data', () => {
    const result = getHandler(10, mockReq, mockCallback);
    const expected = { ...expectedResult, formData: { formIndex: expectedIndex } };
    expect(result).toEqual(expected);
  });
});