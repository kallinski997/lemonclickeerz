# APK Build Anleitung / APK Build Instructions

Diese Anleitung erklärt, wie du eine Android APK für die Lemon Clicker App erstellen kannst.

## Voraussetzungen / Prerequisites

1. **Node.js und npm** installiert (Version 14 oder höher)
2. **Android Studio** installiert mit Android SDK
3. **Java Development Kit (JDK)** 17 oder höher

## Einrichtung / Setup

### 1. Abhängigkeiten installieren / Install Dependencies

```bash
npm install
```

### 2. Web-Dateien vorbereiten / Prepare Web Files

Die Quelldateien müssen in das `www` Verzeichnis kopiert werden:

```bash
mkdir -p www
cp *.html *.js *.css *.png www/
```

### 3. Android Projekt synchronisieren / Sync Android Project

```bash
npm run sync
```

Dies kopiert die Web-Dateien in das Android-Projekt und synchronisiert die Konfiguration.

## APK Erstellen / Build APK

### Debug-APK (zum Testen) / Debug APK (for Testing)

```bash
npm run build:apk
```

Die APK befindet sich dann unter:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release-APK (für Veröffentlichung) / Release APK (for Publication)

Für eine signierte Release-APK:

1. **Keystore erstellen** (falls noch nicht vorhanden):
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias lemon-clicker -keyalg RSA -keysize 2048 -validity 10000
```

2. **Keystore-Informationen in gradle.properties eintragen**:

Erstelle/Bearbeite `android/gradle.properties` und füge hinzu:
```properties
MYAPP_RELEASE_STORE_FILE=../../my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=lemon-clicker
MYAPP_RELEASE_STORE_PASSWORD=dein_passwort
MYAPP_RELEASE_KEY_PASSWORD=dein_passwort
```

3. **Build-Konfiguration in build.gradle anpassen**:

In `android/app/build.gradle`, füge im `android` Block hinzu:
```gradle
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

4. **Release-APK erstellen**:
```bash
npm run build:apk-release
```

Die signierte APK befindet sich dann unter:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Installation auf dem Gerät / Install on Device

### Via ADB (Android Debug Bridge)

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Dateiübertragung / Via File Transfer

1. Kopiere die APK-Datei auf dein Android-Gerät
2. Öffne die Datei auf dem Gerät
3. Erlaube die Installation aus unbekannten Quellen, wenn nötig
4. Folge den Installationsanweisungen

## Anpassungen / Customization

### App-Name und Icon ändern / Change App Name and Icon

1. **App-Name**: Bearbeite `capacitor.config.json`
2. **App-Icon**: Ersetze die Icons in:
   - `android/app/src/main/res/mipmap-*/ic_launcher.png`
   - Oder nutze Tools wie [App Icon Generator](https://appicon.co/)

### App-ID ändern / Change App ID

Bearbeite `capacitor.config.json`:
```json
{
  "appId": "com.deinefirma.lemonclicker",
  "appName": "Lemon Clicker"
}
```

Dann synchronisiere:
```bash
npm run sync
```

## Fehlerbehebung / Troubleshooting

### Gradle Build Fehler / Gradle Build Errors

Falls der Build fehlschlägt:

1. Öffne das Projekt in Android Studio:
   ```bash
   npx cap open android
   ```

2. Lass Android Studio die Gradle-Konfiguration synchronisieren

3. Überprüfe die Android SDK Version in `android/app/build.gradle`

### Fehlende Dateien / Missing Files

Falls Dateien fehlen, stelle sicher dass:
- Die `www` Verzeichnis alle HTML/JS/CSS Dateien enthält
- Du `npm run sync` ausgeführt hast

## Nächste Schritte / Next Steps

- Upload in Google Play Store (erfordert ein Developer-Konto)
- Implementierung von automatischen Updates
- Integration von native Android Features über Capacitor Plugins

## Support

Bei Fragen oder Problemen, erstelle ein Issue im GitHub Repository.
