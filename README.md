# LogSeq TimePicker Plugin

A simple time picker plugin for LogSeq that allows you to quickly insert time values into your blocks.

## Features

- 🕐 Quick time insertion via `/time` slash command
- 📱 Popup modal interface with dropdown selects
- 🌓 Automatic light/dark theme support
- ⌨️ Keyboard shortcuts (Enter to insert, Escape to close)
- 🎯 "Now" button for current time
- 🔢 24-hour format (HH:MM)

## Usage

1. Type `/time` in any block
2. Select hour and minute from dropdowns
3. Click "Insert" or press Enter
4. Time is inserted at cursor position

## Installation

### From LogSeq Marketplace (Coming Soon)

Search for "TimePicker" in the LogSeq plugins marketplace.

### Manual Installation (Development)

1. Clone this repository
2. Run `pnpm install`
3. Run `pnpm build`
4. Open LogSeq → Settings → Advanced → Developer mode
5. Go to Plugins → Load unpacked plugin
6. Select this plugin directory

## Development

```bash
# Install dependencies
pnpm install

# Development mode with HMR
pnpm dev

# Build for production
pnpm build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
