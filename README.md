# endless-running-game
An exercise in fundamentals where I make a game with a totally old concept


## Releasing

1. Build the APK `cordova build android --release`
2. Make a keystore if necessary `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
3. Sign `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias_name`
4. Zip align `zipalign 4 <signedAPK> <nameOfOutputFile>`
