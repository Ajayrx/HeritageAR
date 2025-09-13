# 🏛️ Heritage AR - Preserving India's Cultural Legacy

[![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)

An immersive mobile application that brings India's rich cultural heritage to life through Augmented Reality (AR) technology. Explore iconic monuments, learn through interactive quizzes, and experience history like never before.

## 🌟 Features

### 🏛️ **Heritage Sites Explorer**
- **5 Iconic Indian Monuments**: Taj Mahal, Konark Sun Temple, Ajanta-Ellora Caves, Meenakshi Temple, and Amer Fort
- **Detailed Information**: Historical context, architectural significance, and cultural importance
- **High-Quality Images**: Stunning visuals of each heritage site
- **Interactive Cards**: Expandable information panels with architect details and significance

### 📱 **Augmented Reality Experience**
- **Real-time AR Camera**: Point your device to explore 3D models of monuments
- **Interactive 3D Models**: Virtual tours and immersive experiences
- **AR Markers**: Visual indicators for enhanced interaction
- **Audio Narration**: Voice guides for complete AR experiences
- **Camera Controls**: Switch between front and back cameras

### 🧠 **Cultural Knowledge Quiz**
- **20+ Questions**: Test your knowledge of Indian heritage and culture
- **Multiple Choice Format**: Engaging and educational quiz experience
- **Instant Feedback**: Immediate results with detailed explanations
- **Progress Tracking**: Monitor your learning journey
- **Achievement System**: Unlock badges as you learn

### 👤 **Personal Profile & Progress**
- **Learning Statistics**: Track sites visited, quizzes completed, and AR experiences
- **Achievement Badges**: Unlock rewards for exploration milestones
- **Customizable Settings**: Language preferences, notifications, and audio controls
- **Offline Mode**: Download content for areas with limited connectivity
- **Progress Streaks**: Maintain daily learning habits

## 🎨 Design & User Experience

### **Light & Warm Theme**
- **Cream & Orange Palette**: Warm, welcoming colors inspired by Indian architecture
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: High contrast ratios and readable typography
- **Responsive Design**: Optimized for various screen sizes

### **Interactive Elements**
- **Clean AR Logo**: Simple, recognizable AR scan icon with subtle animations
- **Glowing Animations**: Dynamic visual effects for enhanced engagement
- **Gradient Buttons**: Beautiful orange gradients for call-to-actions
- **Card Shadows**: Subtle depth effects for modern appearance
- **Smooth Transitions**: Fluid navigation between screens

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/heritage-ar.git
   cd heritage-ar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

### Building for Production

```bash
# Build for web
npm run build:web

# Build for iOS/Android (requires Expo Application Services)
eas build --platform ios
eas build --platform android
```

## 🛠️ Technology Stack

### **Frontend**
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript development
- **Expo Router**: File-based navigation system

### **UI/UX**
- **Lucide React Native**: Beautiful, customizable icons including AR scan logo
- **Expo Linear Gradient**: Smooth gradient effects
- **React Native Reanimated**: Smooth animations and transitions

### **AR & Camera**
- **Expo Camera**: Camera access and AR capabilities
- **CameraView**: Modern camera component for AR experiences

### **Development Tools**
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Expo Dev Tools**: Development and debugging

## 📂 Project Structure

```
heritage-ar/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── heritage.tsx   # Heritage sites explorer
│   │   ├── ar.tsx         # AR camera experience
│   │   ├── quiz.tsx       # Cultural knowledge quiz
│   │   └── profile.tsx    # User profile and settings
│   └── _layout.tsx        # Root layout configuration
├── assets/                # Static assets
│   └── images/           # Heritage site images
├── constants/            # App constants and configuration
│   └── Colors.ts         # Theme color definitions
├── components/           # Reusable UI components
└── package.json         # Dependencies and scripts
```

## 🎯 Key Features Breakdown

### **Heritage Sites Data**
Each heritage site includes:
- Historical background and significance
- Architectural details and building period
- UNESCO World Heritage status
- High-resolution images
- AR availability status

### **AR Implementation**
- Real-time camera feed processing
- 3D model overlay capabilities
- Interactive marker system
- Audio narration integration
- Multi-angle exploration

### **Quiz System**
- Randomized question selection
- Immediate feedback mechanism
- Detailed explanations for each answer
- Progress tracking and scoring
- Achievement unlocking system

## 🌐 Supported Platforms

- **iOS**: iPhone and iPad (iOS 13+)
- **Android**: Android devices (API level 21+)
- **Web**: Modern browsers with WebGL support

## 🤝 Contributing

We welcome contributions to Heritage AR! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Add proper documentation for new features
- Test on both iOS and Android platforms
- Ensure accessibility compliance

## 🙏 Acknowledgments

- **Indian Archaeological Survey**: For heritage site information and inspiration
- **UNESCO**: For World Heritage Site classifications and data
- **Expo Team**: For the excellent development platform
- **React Native Community**: For continuous innovation and support

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Ajayrx/heritage-ar/issues)
- **Email**: ajay0i0know@gmail.com

---

**Heritage AR** - *Bridging the past and future through technology* 🏛️✨

Made with ❤️ for preserving India's incredible cultural heritage.
