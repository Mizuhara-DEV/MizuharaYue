import { User, GuildMember } from 'discord.js';

export default class ModelAccount {
  /** Khơi tạo mô hình người dùng.
   * @param {GuildMember | User} discordUser Dữ liệu người dùng.
   */
  constructor(discordUser) {
    this.id = discordUser.id;
    this.name = discordUser.displayName;
    this.level = {
      level: 1,
      xp: 0,
      xpToNextLevel: 1000,
    };
    this.assets = {
      cash: 10_000,
      lucky: 0,
      lockedCash: 0,
    };
    this.bank = {
      bankBalance: 10_000,
      loanLimit: 50_000,
      loanAmount: 0,
      loanCreatedAt: 0,
      loanInterestAccrued: 0,
      penaltyAmount: 0,
      blacklisted: false,
      canBorrow: true,
      lastBankActionAt: Date.now(),
      lastBankInterestAt: 0,
      dailyBankActions: 0,
    };
    this.createdAt = Date.now();
  }

  /** @param {GuildMember | User} discordUser */
  static validate(discordUser) {
    if (typeof discordUser.id !== 'string') return { valid: false, reason: 'ID phải là chuỗi ký tự.' };
    if (typeof discordUser.displayName !== 'string')
      return {
        valid: false,
        reason: 'Tên người dùng phải là chuỗi ký tự.',
      };
    return { valid: true, reason: 'ok' };
  }
}
