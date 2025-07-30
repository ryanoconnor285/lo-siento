# Lo Siento - Medical Spanish Communication Aid

A React Native/Expo app designed to help healthcare professionals communicate with Spanish-speaking patients. The app provides essential medical phrases with audio pronunciations.

## Features

- **Cross-platform**: Works on iOS, Android, and Web
- **Audio Pronunciation**: Each phrase includes native Spanish audio
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Medical Focus**: Phrases specifically chosen for healthcare scenarios
- **Offline Ready**: Audio files are bundled with the app

## Live Demo

🌐 **Web Version**: [https://ryanoconnor285.github.io/lo-siento/](https://ryanoconnor285.github.io/lo-siento/)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Expo CLI
- For mobile development: Expo Go app on your device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ryanoconnor285/lo-siento.git
cd lo-siento
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on Different Platforms

- **Web**: `npm run web` or `expo start --web`
- **iOS**: `npm run ios` (requires iOS Simulator or Expo Go app)
- **Android**: `npm run android` (requires Android Emulator or Expo Go app)

## Deployment

### Web Deployment (GitHub Pages)

The app automatically deploys to GitHub Pages when you push to the `staging` branch:

1. Create and switch to staging branch:
```bash
git checkout -b staging
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Your changes"
```

3. Push to staging:
```bash
git push origin staging
```

The GitHub Action will automatically build and deploy the web version to GitHub Pages.

### iOS Deployment (App Store / TestFlight)

The app can automatically build and deploy to TestFlight and the App Store:

#### Automatic Deployment:
- **TestFlight**: Push to `main` branch
- **App Store**: Create a version tag (e.g., `git tag v1.0.0 && git push origin v1.0.0`)

#### Setup Required:
See [IOS_AUTOMATION_SETUP.md](./IOS_AUTOMATION_SETUP.md) for detailed setup instructions.

You'll need:
- Apple Developer Account
- Expo account with EAS Build subscription
- GitHub Secrets configured (EXPO_TOKEN, APPLE_ID, etc.)

### Manual Deployment

You can also deploy manually:

```bash
# Web
npm run deploy

# iOS (requires EAS CLI)
eas build --platform ios --profile production
eas submit --platform ios
```

## Project Structure

```
lo-siento/
├── App.js                 # Main application component
├── assets/               # Audio files and images
│   ├── *.mp3            # Spanish audio pronunciations
│   └── *.png            # App icons and images
├── components/          # Reusable components
├── web/                 # Web-specific files
│   └── index.html       # Custom HTML template
├── .github/workflows/   # GitHub Actions
│   └── deploy.yml       # Deployment workflow
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Adding New Phrases

To add new medical phrases:

1. Add the audio file (.mp3) to the `assets/` folder
2. Add the phrase object to the `phrases` array in `App.js`:

```javascript
{
  label: "Your Label",
  english: "English phrase",
  spanish: "Spanish translation",
  file: require("./assets/your-audio-file.mp3"),
}
```

## Web Optimizations

The app includes several web-specific optimizations:

- **Responsive Design**: Adapts to different screen sizes
- **Desktop Layout**: Two-column layout on larger screens
- **Web-specific Styling**: Enhanced typography and spacing
- **SEO Optimization**: Meta tags for search engines
- **PWA Features**: Can be installed as a web app
- **Loading States**: Better user feedback during audio loading

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **Expo AV**: Audio playback functionality
- **GitHub Actions**: Automated deployment
- **GitHub Pages**: Web hosting

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the 0BSD License - see the [LICENSE](LICENSE) file for details.

## Contact

Ryan O'Connor - [@ryanoconnor285](https://github.com/ryanoconnor285)

Project Link: [https://github.com/ryanoconnor285/lo-siento](https://github.com/ryanoconnor285/lo-siento)ack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).
