import { getOrCreateCentral, saveCentral } from '#plugins/central-plugin.mjs';
import config from '#data/configs/config.mjs';
import { error, success } from '#utils/Console.mjs';

export default class CurrencyService {
  #centralCell = {
    id: '',
    totalCash: 0,
    totalBank: 0,
    totalLoaned: 0,
    bankInterestRate: 0,
    loanInterestRate: 0,
    maxLoanRatio: 0,
  };

  /**
   *
   * @param {DiscordClient} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Initialize the currency service
   */
  async init() {
    try {
      const central = await getOrCreateCentral(this.client, config.database.DEFAULT_CENTRAL_ID);
      this.#centralCell = {
        id: central.id,
        totalCash: central.totalCash,
        totalBank: central.totalBank,
        totalLoaned: central.totalLoaned,
        bankInterestRate: central.bankInterestRate,
        loanInterestRate: central.loanInterestRate,
        maxLoanRatio: central.maxLoanRatio,
      };
    } catch (err) {
      error('lỗi khởi tạo central');
      error(`ERROR: ${err}`);
    } finally {
      success('Khởi tạo central');
    }
  }

  /**
   * Cộng Tiền vào Central Cash
   * @param {Number} money
   */
  cashTang(money) {
    this.#centralCell.totalCash += money;
  }

  /**
   * Trừ Tiền Central Cash
   * @param {Number} money
   */
  cashGiam(money) {
    this.#centralCell.totalCash -= money;
  }

  /**
   * Cộng Tiền vào Central Bank
   * @param {Number} money
   */
  bankTang(money) {
    this.#centralCell.totalBank += money;
  }

  /**
   * Trừ Tiền Central Bank
   * @param {Number} money
   */
  bankGiam(money) {
    this.#centralCell.totalBank -= money;
  }

  /**
   * Cộng Tiền vào Central Loaned
   * @param {Number} money
   */
  loanedTang(money) {
    this.#centralCell.totalLoaned += money;
  }

  /**
   * Trừ Tiền Central Loaned
   * @param {Number} money
   */
  loanedGiam(money) {
    this.#centralCell.totalLoaned -= money;
  }

  async SyncCentral() {
    saveCentral(this.client, {
      id: this.#centralCell.id,
      totalCash: this.#centralCell.totalCash,
      totalBank: this.#centralCell.totalBank,
      totalLoaned: this.#centralCell.totalLoaned,
      bankInterestRate: this.#centralCell.bankInterestRate,
      loanInterestRate: this.#centralCell.loanInterestRate,
      maxLoanRatio: this.#centralCell.maxLoanRatio,
    });
  }

  /**
   * Lấy dữ liệu Central
   */
  get getCentral() {
    return this.#centralCell;
  }
}
