const config = {
  bot: {
    check: false,
    intents_code: 3276799,
  },
  database: {
    // Đường dẫn cơ sở dữ liệu.
    userspath: './database/user_database.yaml', // Tên tệp cơ sở dữ liệu người dùng.
    guildspath: './database/guild_database.yaml', // Tên tệp cơ sở dữ liệu bang hội.
    centralpath: './database/central_database.yaml', // Tên tệp cơ sở dữ liệu trung tâm.
    DEFAULT_CENTRAL_ID: 'MizuharaCentralBank', // ID Ngân hàng trung tâm mặc định.
  },
  development: {
    enabled: false, // Nếu đúng, bot sẽ đăng ký tất cả các lệnh ứng dụng cho một bang hội cụ thể (không phải trên toàn cầu).
    guildId: '1317181883917926450', // ID bang hội để đăng ký các lệnh ứng dụng khi chế độ phát triển được bật.
  },
  commands: {
    prefix: '.', // Đối với các lệnh tin nhắn, cần có tiền tố. Điều này có thể được thay đổi bởi cơ sở dữ liệu.
    message_commands: true, // Nếu đúng, bot sẽ cho phép người dùng sử dụng lệnh tin nhắn (hoặc tiền tố).
    application_commands: {
      chat_input: true, // Nếu đúng, bot sẽ cho phép người dùng sử dụng lệnh nhập trò chuyện (hoặc dấu gạch chéo).
      user_context: true, // Nếu đúng, bot sẽ cho phép người dùng sử dụng các lệnh menu ngữ cảnh của người dùng.
      message_context: true, // Nếu đúng, bot sẽ cho phép người dùng sử dụng các lệnh menu ngữ cảnh tin nhắn.
    },
  },
  users: {
    ownerId: '1258813009648681025', // ID chủ sở hữu bot là bạn.
    developers: ['1258813009648681025', 'Another account ID'], // Các nhà phát triển bot, hãy nhớ bao gồm ID tài khoản của bạn cùng với các ID tài khoản khác.
  },
  messages: {
    // Cấu hình tin nhắn cho các lệnh ứng dụng và trình xử lý lệnh tin nhắn.
    NOT_BOT_OWNER: 'Bạn không có quyền chạy lệnh này vì bạn không phải là chủ sở hữu của tôi!',
    NOT_BOT_DEVELOPER: 'Bạn không có quyền chạy lệnh này vì bạn không phải là người phát triển của tôi!',
    NOT_GUILD_OWNER: 'Bạn không có quyền chạy lệnh này vì bạn không phải là chủ bang hội!',
    CHANNEL_NOT_NSFW: 'Bạn không thể chạy lệnh này trong kênh không phải NSFW!',
    MISSING_PERMISSIONS: 'Bạn không có quyền chạy lệnh này, thiếu quyền.',
    COMPONENT_NOT_PUBLIC: 'Bạn không phải là người tạo nút này!',
    GUILD_COOLDOWN: 'Bạn hiện đang trong thời gian chờ, bạn có thể sử dụng lại lệnh này sau \`%cooldown%s\`.',
  },
};

export const { database, development, commands, messages, users } = config;

export default config;
