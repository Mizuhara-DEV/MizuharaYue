# <samp>MizuharaYue | 冰の女王 ❄️ Nữ hoàng Băng giá</samp>

<div align="center">
  <img src="https://img.shields.io/badge/Discord.js-v14.25+-blue?style=for-the-badge&logo=discord" alt="Discord.js">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-GPL--3.0-orange?style=for-the-badge" alt="License">
  <br>
  <img src="https://img.shields.io/github/stars/TFAGaming/MizuharaYue?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/TFAGaming/MizuharaYue?style=social" alt="Forks">
</div>

**MizuharaYue** là một Discord Bot được xây dựng bằng **discord.js v14.25+**, sử dụng **JavaScript ES Module (.mjs)**, thiết kế theo mô hình handler rõ ràng cho **commands, components và events**.  
Dự án hướng tới việc dễ mở rộng, dễ bảo trì và phù hợp cho cả học tập lẫn triển khai thực tế.

Nếu bạn thấy dự án hữu ích, đừng quên ⭐ repository để ủng hộ nhé!

---

## ✨ Tính năng chính

- 🚀 Sử dụng **discord.js v14.25+** (phiên bản mới nhất).
- 📦 Viết bằng **JavaScript ES Module** (`.mjs`) với cấu hình module rõ ràng.
- 🤖 Hỗ trợ đầy đủ các loại lệnh:
    - Message Commands (prefix-based).
    - Application Commands:
        - Slash Command (Chat Input)
        - User Context Menu
        - Message Context Menu
- 🎛️ Xử lý **Components** mạnh mẽ:
    - Buttons
    - Select Menus
    - Modals
    - Autocomplete
- ⚡ Hệ thống handler tách biệt, dễ quản lý và mở rộng.
- 🛡️ Hỗ trợ cooldown, phân quyền, owner-only, NSFW checks.
- 💾 Database đơn giản sử dụng **YAML** (phù hợp cho bot vừa & nhỏ).
- 🔧 Plugins tích hợp: Account Management, Currency Service, Central Bank.
- 🎨 Logging và Console utilities với màu sắc.

---

## 📁 Cấu trúc Commands, Components và Events

### 📨 Message Commands

Sử dụng `Partial` cho options.  
`Awaitable` nghĩa là hàm có thể là **async**.

```javascript
new MessageCommand({
	command: {
		name: 'ping', // Tên lệnh
		description: 'Trả lời với Pong!', // Mô tả (không bắt buộc)
		aliases: ['p'], // Bí danh
		permissions: ['SendMessages'], // Quyền Discord
	},
	options: {
		cooldown: 5000, // Thời gian hồi chiêu (ms)
		botOwner: false, // Chỉ owner bot được dùng
		guildOwner: false, // Chỉ owner server
		botDevelopers: false, // Dev bot
		nsfw: false, // Nội dung NSFW
	},
	run: async (client, message, args) => {
		await message.reply('**Pong!** ' + client.ws.ping + 'ms');
	},
});
```

### ⚡ Application Commands (Slash Commands)

```javascript
new ApplicationCommand({
	command: {
		name: 'ping',
		description: 'Trả lời với Pong!',
		type: 1, // Chat Input
		options: [],
	},
	options: {
		cooldown: 5000,
	},
	run: async (client, interaction) => {
		await interaction.reply('**Pong!** ' + client.ws.ping + 'ms');
	},
});
```

### 🎛️ Components (Buttons, Selects, Modals)

```javascript
new Component({
	customId: 'example-button',
	type: 'button',
	run: async (client, interaction) => {
		await interaction.reply('Đã trả lời từ tương tác Nút!');
	},
});
```

### 🎯 Events

```javascript
new Event({
	event: 'clientReady',
	once: true,
	run: (client) => {
		console.log('Bot is ready!');
	},
});
```

---

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- **Node.js** 18+
- **npm** hoặc **yarn**

### Bước 1: Clone repository

```bash
git clone https://github.com/TFAGaming/MizuharaYue.git
cd MizuharaYue
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình

1. Sao chép file cấu hình mẫu:

    ```bash
    cp .env.example .env
    cp src/data/configs/example.config.mjs src/data/configs/config.mjs
    cp database/central_database.yaml.example database/central_database.yaml
    cp database/guild_database.yaml.example database/guild_database.yaml
    cp database/user_database.yaml.example database/user_database.yaml
    ```

2. Chỉnh sửa `.env`:

    ```
    CLIENT_TOKEN="Your Discord Bot Token"
    ```

3. Chỉnh sửa `src/data/configs/config.mjs` theo nhu cầu (owner ID, developers, etc.).

### Bước 4: Chạy bot

```bash
npm start
# Hoặc cho development với auto-reload:
npm run dev
```

### Bước 5: Đăng ký lệnh (nếu cần)

Bot sẽ tự động đăng ký lệnh khi khởi động. Nếu gặp vấn đề, sử dụng lệnh `/reload` (chỉ dành cho developers).

---

## 📂 Cấu trúc Thư mục

```
MizuharaYue/
├── src/
│   ├── client/
│   │   ├── DiscordBot.mjs          # Lớp chính của bot
│   │   ├── handler/                 # Handlers cho commands, components, events
│   │   └── ...
│   ├── commands/                    # Lệnh (Message & Application)
│   │   ├── Utility/
│   │   ├── Information/
│   │   └── ...
│   ├── components/                  # Components (Buttons, Modals, etc.)
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── ...
│   ├── events/                      # Sự kiện Discord
│   ├── plugins/                     # Plugins (Account, Currency, etc.)
│   ├── structure/                   # Cấu trúc cơ sở (Command, Event, etc.)
│   ├── utils/                       # Utilities (Console logging)
│   └── data/
│       ├── configs/                 # Cấu hình
│       └── model/                   # Models (User Account, Central Bank)
├── database/                        # Database YAML files
├── .vscode/                         # Cấu hình VS Code
├── .env.example                     # Mẫu file môi trường
├── package.json                     # Dependencies & scripts
└── README.md                        # Tài liệu này
```

---

## 🔧 Plugins & Features

- **Account Plugin**: Quản lý tài khoản người dùng (tiền, level, bank).
- **Central Plugin**: Ngân hàng trung tâm với lãi suất.
- **Currency Service**: Dịch vụ tiền tệ và giao dịch.
- **Console Utils**: Logging với màu sắc và ghi vào file.

Ví dụ sử dụng plugin:

```javascript
import { getOrCreateAccount } from '#plugins/account-plugin.mjs';

const account = await getOrCreateAccount(client, message.author);
console.log(`Balance: ${account.assets.cash}`);
```

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository.
2. Tạo branch mới cho feature/bugfix.
3. Commit changes với thông điệp rõ ràng.
4. Push và tạo Pull Request.

### Quy tắc đóng góp

- Tuân thủ ESLint & Prettier config.
- Viết code rõ ràng, có comment.
- Test kỹ trước khi submit.

---

## 📄 License

Dự án này được phân phối dưới giấy phép **GPL-3.0**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 📞 Liên hệ

- **Author**: [Mizuhara-DEV](https://github.com/Mizuhara-DEV)
- **Discord**: [MizuharaYue Support](https://discord.gg/pZqtPzkw) (giả định)
- **Issues**: [GitHub Issues](https://github.com/Mizuhara-DEV/MizuharaYue/issues)

Nếu bạn có câu hỏi hoặc cần hỗ trợ, hãy tạo issue trên GitHub hoặc tham gia server Discord của chúng tôi!

---

<div align="center">
  <strong>Được tạo với ❤️ bởi TFAGaming</strong>
</div>
