# endless-running-game
An exercise in fundamentals where I make a game with a totally old concept


## Releasing

1. Increment the version number in config.xml
2. Build the APK `cordova build android --release`
3. Make a keystore if necessary `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
4. Sign `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias_name`
5. Zip align `zipalign 4 <signedAPK> <nameOfOutputFile>`
