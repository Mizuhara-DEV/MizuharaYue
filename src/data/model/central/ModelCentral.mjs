import config from '#configs/config.mjs';

const DEFAULT_CENTRAL_ID = config.database.DEFAULT_CENTRAL_ID || 'MizuharaCentralBank';

export default class ModelCentral {
  /** Tạo mẫu kho trung tâm mặc định.
   * @param {string} centralID
   */
  constructor(centralID = DEFAULT_CENTRAL_ID) {
    this.id = centralID;

    this.totalCash = 10_000_000_000;
    this.totalBank = 0;
    this.totalLoaned = 0;

    this.bankInterestRate = 0.0002;
    this.loanInterestRate = 0.0008;

    this.maxLoanRatio = 0.5;
  }

  /**
   *
   * @param {String} centralID
   * @returns
   */
  static validate(centralID) {
    if (typeof centralID !== 'string' && centralID !== DEFAULT_CENTRAL_ID)
      return { valid: false, reason: 'centralID không hợp lệ!' };
    return { valid: true, reason: '' };
  }
}
