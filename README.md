# endless-running-game
An exercise in fundamentals where I make a game with a totally old concept


## Releasing

1. Increment the version number in config.xml
2. Make sure to copy in assets folder from google drive
3. Build the APK `cordova build android --release`
4. Make a keystore if necessary `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
5. `cordova build android --release -- --keystore=<keystore location> --storePassword=<keystore password> --alias=<key alias> --password=<alias password>``
6. Test locally to make sure you don't have to re-upload with a new version number
