## 📱 Posture Detection App

A **React Native CLI** mobile application that uses your phone's **front camera** to monitor posture in real-time using **MoveNet** (via TensorFlow\.js) inside a WebView. The app analyzes posture from camera frames and provides visual feedback on posture quality.

---

## 📦 Installation

Follow these simple steps to get the app running on your Android device:

1. **Install dependencies**
   Run the following in your project root:

   ```bash
   npm install
   ```

2. **Connect your Android device**
   Make sure:

   * USB debugging is enabled
   * Your device is connected via USB
   * You can verify the device is connected using:

     ```bash
     adb devices
     ```

3. **Run the app on Android**
   Start the app by running:

   ```bash
   npm run android
   ```

   This will build and install the app on your connected phone.

> 📌 Make sure Android permissions (camera, audio) are properly set in your `AndroidManifest.xml`.

---

### 📸 Features

* 🔍 Real-time posture detection using **MoveNet Lightning**.
* 🎥 Live camera preview with **react-native-vision-camera**.
* 🌐 Pose estimation inside **WebView** with TensorFlow\.js.
* ✅ Feedback on posture status (`good`, `warning`, `poor`).
* ⏱️ Session tracking with time and alerts count.
* 📊 Score-based posture indicator with live updates.
* 🔄 Switch between front and back camera.
* 🚫 No server communication – works fully **offline**.

---

### 🧱 Technologies Used

* **React Native CLI**
* **TensorFlow\.js** (MoveNet) in WebView
* **react-native-vision-camera** (camera)
* **react-native-webview** (pose detection)
* **react-native-fs** (file handling)
* **Custom Hooks & Components** for posture monitoring

---

### 📂 File Structure (Simplified)

```
📦root
 ┣ 📂android_asset/src/html/
 ┃ ┗ 📄pose.html         # TensorFlow.js pose detection script
 ┣ 📂components/
 ┃ ┣ 📄CameraOverlay.jsx
 ┃ ┣ 📄CameraView.jsx
 ┃ ┣ 📄TopBar.jsx
 ┃ ┣ 📄BottomControls.jsx
 ┃ ┗ 📄PostureIndicator.jsx
 ┣ 📂hooks/
 ┃ ┗ 📄usePostureMonitoring.js
 ┣ 📂utils/
 ┃ ┗ 📄PostureUtils.jsx
 ┣ 📄PostureMonitoringScreen.jsx
 ┗ 📄README.md
```

---

### 🚀 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/your-username/posture-detection-app.git
cd posture-detection-app
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure Android/iOS permissions

Make sure the following permissions are added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

#### 4. Build assets

* Ensure `pose.html` is copied into:

  * Android: `android/app/src/main/assets/src/html/pose.html`
  * iOS: placed under `ios/YourAppName/Bundle/` and referenced using `RNFS.MainBundlePath`

#### 5. Start the app

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

### 🧠 How It Works

1. The app uses the **VisionCamera** to capture photos every few seconds.
2. The photo is encoded to base64 and sent to a **WebView** containing `pose.html`.
3. `pose.html` loads TensorFlow\.js and the MoveNet model to estimate body keypoints.
4. Posture is analyzed using logic based on head, neck, and shoulder alignment.
5. Posture data is returned to the app, and the UI updates the session stats.

---

### 🧪 Posture Analysis Output Example

```json
{
  "posture": "good",
  "confidence": 0.66,
  "reason": "Slight forward head posture",
  "score": 90,
  "details": {
    "left_ear": {...},
    "left_shoulder": {...}
  }
}
```

---

### 📦 Dependencies

```json
{
  "@tensorflow/tfjs": "^4.x",
  "@tensorflow-models/pose-detection": "^3.x",
  "react-native-vision-camera": "^2.x",
  "react-native-webview": "^13.x",
  "react-native-fs": "^2.x"
}
```

---

### 📌 TODO

* [ ] Add history of posture over time
* [ ] Export session summary report
* [ ] Show full body skeleton in UI
* [ ] Add haptic/audio alerts for poor posture

---

### 📸 Screenshots

*Add screenshots here if available for better presentation.*
![WhatsApp Image 2025-06-19 at 12 23 01_20c14d99](https://github.com/user-attachments/assets/18507cc2-2241-49c1-baa1-aa9a816be1aa)

---

### 📃 License

MIT © 2025 
