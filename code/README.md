# IMS Application for IIIT Hyderabad 

### Building with react-native cli

## Step 0:  Setup the React Environment
```
https://reactnative.dev/docs/environment-setup
```

## Step 1: Clone the repository

## Step 1.1: Remove node_modules and package-lock.json 
```
    rm -r  code/node_modules/* package-lock.json
```
   
## Step 2: Install the dependencies
```
npm install
```

## Step 3: Run the following to start the application in dev mode. 
```
npx react-native start
```

## Step 4: Modifying your App

### Adding New screen 
1. Add the screen in `src/Navigation.tsx` stack and then add the file in `src/screens/`. 
2. If need be, define React Native navigation types for the screen and its props in `src/custom-types.tsx`.

### Adding New component
1. Add the component file name in  `src/components/` and then import it in a file and use it `<componentfilename />`

### Useful Resources
1. Navigation between screens: 
```
    https://reactnavigation.org/docs/getting-started
```

2. Customized style
```
    https://reactnative.dev/docs/style
    https://reactnativeelements.com
```


### Build and Deployment 
1. Increase the versionCode (Line 82) in android/app/build.gradle file to +1.
2. Increase the versionName (Line 83) in android/app/build.gradle file to +0.1.
3. cd into the frontend folder and Run
   ```
       npx react-native build-android --mode="release"
   ```
4. The generated output aab file location: android/app/build/outputs/bundle/release/app-release.aab 

