# SIHINTERNALHACKATHON

### YOU CAN FIND THE LINK OF VIDEO AND PPT IN PROJECT'S ROOT DIRECTORY IN FILE NAMED :  VideoAndPPTLINK.txt

## LOCAL SETUP

REQUIREMENTS : 
1) Firebase Account
2) Node js and npm
3) Android Studio

Steps :

Create a file named FirebaseKey.ts inside src/components directory and add your firebase api key as  : export const FIREBASE_API_KEY = YOUR_API_KEY

```
git clone https://github.com/KrishRathor/SIHINTERNALHACKATHON.git
cd SIHINTERNALHACKATHON
```

```
npm install
ionic cap add android
ionic cap build android
```

This will open the project in android studio

For ios:

```
ionic cap add ios
ionic cap build ios
```

This will open the project in xcode
