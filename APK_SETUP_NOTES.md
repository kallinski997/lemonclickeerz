# APK Build Setup - Hinweise / Notes

## Setup Erfolgreich Abgeschlossen ✅

Die komplette Infrastruktur für Android APK Builds wurde erfolgreich eingerichtet:

### Was wurde konfiguriert:

1. ✅ **Node.js Projekt** mit package.json
2. ✅ **Capacitor** installiert und konfiguriert
3. ✅ **Android Plattform** hinzugefügt
4. ✅ **Build-Skripte** erstellt:
   - `npm run sync` - Synchronisiert Web-Dateien mit Android
   - `npm run build:apk` - Erstellt Debug APK
   - `npm run build:apk-release` - Erstellt Release APK
   - `./build-apk.sh` - Kompletter Build-Prozess
5. ✅ **Dokumentation** erstellt (BUILD_APK.md)
6. ✅ **Android Projekt-Struktur** vollständig generiert

### Projekt-Struktur:

```
lemonclickeerz/
├── android/                      # Android-Projekt (Capacitor)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/lemonclicker/app/
│   │   │   └── res/              # Icons, Splash screens
│   │   └── build.gradle
│   ├── gradlew                   # Gradle Wrapper
│   └── build.gradle
├── www/                          # Web-Dateien für Android
├── capacitor.config.json         # Capacitor Konfiguration
├── build-apk.sh                  # Build-Skript
├── BUILD_APK.md                  # Ausführliche Anleitung
└── package.json                  # NPM Dependencies

```

## APK Erstellen auf deinem lokalen Rechner

Um die APK zu erstellen, folge diesen Schritten auf einem Computer mit Internetzugang:

### Voraussetzungen:

1. **Node.js** (Version 14+) - [Download](https://nodejs.org/)
2. **Android Studio** - [Download](https://developer.android.com/studio)
3. **JDK 17** - Wird mit Android Studio installiert

### Schritt-für-Schritt Anleitung:

```bash
# 1. Repository klonen
git clone https://github.com/kallinski997/lemonclickeerz.git
cd lemonclickeerz

# 2. Dependencies installieren
npm install

# 3. APK erstellen
./build-apk.sh
```

Die APK wird erstellt unter:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Alternative: Mit Android Studio

1. Öffne Android Studio
2. Öffne das Projekt: `android/` Verzeichnis
3. Warte bis Gradle sync abgeschlossen ist
4. Menü: Build → Build Bundle(s) / APK(s) → Build APK(s)

## Anpassungen

### App-Name ändern:
Bearbeite `capacitor.config.json`:
```json
{
  "appName": "Dein App Name"
}
```

### App-Icon ändern:
Ersetze die Icons in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`

Oder nutze einen Icon-Generator wie [App Icon Generator](https://appicon.co/)

### Package-Name ändern:
Bearbeite `capacitor.config.json`:
```json
{
  "appId": "com.deinefirma.appname"
}
```

Dann synchronisieren:
```bash
npm run sync
```

## Warum funktioniert der Build nicht in der CI/CD Umgebung?

Der automatische Build in GitHub Actions oder ähnlichen CI/CD Systemen benötigt:
1. Zugriff auf Google's Maven Repository (dl.google.com)
2. Android SDK Installation
3. Ausreichend Speicherplatz für Build-Artifacts

Diese Anforderungen sind in der aktuellen Umgebung nicht erfüllt, aber alle notwendigen Konfigurationsdateien sind vorhanden.

## Nächste Schritte

1. **Lokaler Build**: Folge der Anleitung oben auf deinem Computer
2. **CI/CD Setup**: Optional kannst du GitHub Actions mit Android Build konfigurieren
3. **Play Store**: Nach erfolgreichem Build kannst du die APK im Google Play Store veröffentlichen

## Support

Bei Fragen oder Problemen:
- Siehe [BUILD_APK.md](BUILD_APK.md) für detaillierte Informationen
- Erstelle ein Issue im GitHub Repository
- Dokumentation: [Capacitor Docs](https://capacitorjs.com/)

---

**Status**: ✅ Setup komplett | 🏗️ Build muss lokal durchgeführt werden
