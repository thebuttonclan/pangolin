import postHandler from '../src/postHandler';
import { validateFormData } from '../src/validation';
import { removePageFields, matchPostBody } from '../src/cleanData';
import { getUrlPage } from '../src/helpers';

jest.mock('../src/validation', () => ({
  validateFormData: jest.fn(() => ({ isValidated: true, isValid: true })),
}));

const urlPage = 3;
const nextPage = urlPage + 1;

jest.mock('../src/helpers', () => ({
  ...jest.requireActual('../src/helpers'),
  getUrlPage: jest.fn(() => urlPage),
}));

jest.mock('../src/cleanData', () => ({
  removePageFields: jest.fn(givenData => givenData),
  matchPostBody: jest.fn(givenData => givenData),
}));

const mockReqJs = { body: { js: true, postData: { data: 'test' } }, session: {} };
const mockReqNonJs = { body: { data: 'test' }, session: {} };
const mockRes = { json: jest.fn(_data => {}), redirect: jest.fn(_data => {}) };

const dataCallback = jest.fn(() => ({ data: 'callback data' }));

afterEach(() => jest.clearAllMocks());

describe('postHandler with js', () => {
  it('saves data to session if no callback provided and returns expected props', () => {
    postHandler('', 5, { properties: {} }, [{ properties: {} }], [['']], {}, mockReqJs, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({ formData: mockReqJs.body.postData, nextPage, lastPage: true });
    expect(mockRes.redirect).not.toHaveBeenCalled();
    expect(mockReqJs.session).toEqual({ formData: mockReqJs.body.postData });
  });

  it('uses callback function instead of session if provided', () => {
    postHandler(
      '',
      5,
      { properties: {} },
      [{ properties: {} }],
      [['']],
      {},
      mockReqJs,
      mockRes,
      () => {},
      dataCallback
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      formData: { data: 'callback data' },
      nextPage: urlPage + 1,
      lastPage: true,
    });
  });
});

describe('postHandler without js', () => {
  it('saves data to session if no callback provided and redirects correctly', () => {
    postHandler('test', 5, { properties: {} }, [{ properties: {} }], [['']], {}, mockReqNonJs, mockRes);
    expect(mockRes.redirect).toHaveBeenCalledWith(`test/${nextPage}`);
    expect(mockReqNonJs.session).toEqual({ formData: mockReqNonJs.body });
  });

  it('uses callback function instead of session if provided', () => {
    postHandler(
      '',
      5,
      { properties: {} },
      [{ properties: {} }],
      [['']],
      {},
      mockReqNonJs,
      mockRes,
      () => {},
      dataCallback
    );
    expect(dataCallback).toHaveBeenCalled();
  });
});
