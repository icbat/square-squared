call npm install
call bower install
rm -rf assets/
xcopy "C:\Users\cobbe\Google Drive\squareSquared\assets" .\assets\ /e
gulp
