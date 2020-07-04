import {useState, useEffect} from 'react';

import Sound from 'react-native-sound';
// Enable playback in silence mode
Sound.setCategory('Playback', true);

function createSound(backgroundSound: BackgroundSound) {
  function callback(error: any) {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  }
  const sound = backgroundSound.isRequire
    ? new Sound(backgroundSound.url, callback)
    : new Sound(backgroundSound.url, Sound.MAIN_BUNDLE, callback);
  return sound;
}

interface BackgroundSound {
  name: string;
  url: string;
  isRequire: boolean;
}

interface BackgroundSounds {
  [key: string]: BackgroundSound;
}

const SOUNDS: BackgroundSounds = {
  rainforest: {
    name: 'Rainforest',
    url: require('../assets/sounds/felix_blume_nature_rainforest_ambience_by_river_monkeys_groan_in_bg_insects_birds.mp3'),
    isRequire: true,
  },
} as const;

interface AvailableSound {
  name: string;
  key: string;
}

const availableSounds: AvailableSound[] = Object.entries(SOUNDS).map(
  ([key, sound]) => ({
    key,
    name: sound.name,
  }),
);

export type SoundName = keyof BackgroundSounds;

interface UseBackgroundSoundState {
  soundName?: string;
  isPlaying: boolean;
  availableSounds: AvailableSound[];
}
interface UseBackgroundSoundFunctions {
  selectSound(name: SoundName): void;
  play(): void;
  pause(): void;
  stop(): void;
}

export function useBackgroundSound(): [
  UseBackgroundSoundState,
  UseBackgroundSoundFunctions,
] {
  const [sound, setSound] = useState<Sound>();
  const [soundName, setSoundName] = useState<string>();

  const selectSound = (soundKey: SoundName) => {
    if (sound && sound.isPlaying) {
      sound.stop();
    }
    setSound(createSound(SOUNDS[soundKey]));
    setSoundName(SOUNDS[soundKey].name);
  };

  const play = () => {
    if (sound) {
      sound.setNumberOfLoops(-1);
      sound.play((success: boolean) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  const pause = () => {
    if (sound) {
      sound.pause();
    }
  };

  const stop = () => {
    if (sound) {
      sound.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [sound]);

  return [
    {soundName, isPlaying: !!sound?.isPlaying(), availableSounds},
    {selectSound, play, pause, stop},
  ];
}
