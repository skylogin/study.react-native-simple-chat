import React, { useState } from 'react';
import { Image } from 'react-native';

import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import Index from './src';

import { images } from './src/utils/images';


const cacheImages = (images:any) => {
  return images.map((image:any) => {
    if(typeof image === 'string'){
      return Image.prefetch(image);
    } else{
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = (fonts:any) => {
  return fonts.map((font:any) => Font.loadAsync(font));
};

export default function App() {

  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([require('./assets/splash.png'), ...Object.values(images)]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  return (
    isReady? (
      <Index /> 
    ) : (
      <AppLoading
        startAsync={_loadAssets}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  );
}