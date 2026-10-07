# DSW02B1 Test 2

This repository now contains four separate Expo blank JavaScript projects:

- `question1` - UJ Student Task Hub
- `question2` - MyUJ Secure Profile
- `question3` - UJ Campus Services
- `question4` - UJ Campus Alert Centre

Each project was created from the Expo blank JavaScript template, not Expo Router or TypeScript. `node_modules/`, `.expo/` and generated `dist/` folders are excluded by Git ignore files.

## Run Commands

From the repository root:

```bash
cd question1
npm install
npm start
```

Repeat the same pattern for `question2`, `question3` and `question4`.

Useful checks:

```bash
npm run lint
npx expo export --platform android
npx expo export --platform web
```

The Expo lint wrapper configured ESLint but failed to resolve `eslint` from inside Expo CLI on this Windows setup. The equivalent local command passed in each project:

```bash
node_modules\.bin\eslint.cmd .
```

## Firebase Setup Still Needed

Q1 and Q2 are configured for the shared Firebase project ID `test2-a6b12`:

- `question1/src/firebase/firebaseConfig.js`
- `question2/src/firebase/firebaseConfig.js`

The project-derived values are filled in:

- `authDomain: test2-a6b12.firebaseapp.com`
- `projectId: test2-a6b12`
- `storageBucket: test2-a6b12.firebasestorage.app`

The Firebase Console Web App values still needed are:

- `apiKey`
- `messagingSenderId`
- `appId`

Required Firebase setup:

- Create or use the lecturer-approved Firebase project.
- Add a Web App and paste the remaining values into both files.
- Enable Firestore.
- For Q1, create/use the `tasks` collection.
- For Q2, enable Email/Password authentication.
- Publish the rules in `question2/firestore.rules`.

No practice Firebase project, invented credentials or local substitute backend is used.

## Requirement Mapping

| Question | Main files |
| --- | --- |
| Q1 | `question1/App.js`, `question1/src/firebase/firebaseConfig.js`, `question1/src/components/TaskForm.js`, `TaskList.js`, `TaskCard.js` |
| Q2 | `question2/App.js`, `question2/src/firebase/firebaseConfig.js`, `question2/src/components/AuthScreen.js`, `ProfileScreen.js`, `question2/firestore.rules` |
| Q3 | `question3/App.js`, `question3/src/context/AppContext.js`, `question3/src/data/services.js`, `question3/src/screens/*.js` |
| Q4 | `question4/App.js`, `question4/src/data/alerts.js`, `question4/src/components/AlertCard.js` |

## Simple Explanation

Q1 uses `onSnapshot()` to subscribe to Firestore's `tasks` collection. Every Firestore document is mapped to a task object with `id: doc.id`, so completing, reopening and deleting use the real document ID instead of a list index. `TaskForm`, `TaskList` and `TaskCard` split the form, list and card UI while `App.js` keeps the database logic in one place.

Q2 uses Firebase Authentication to prove who signed in, then Firestore rules enforce what that user may read/write. Registration creates `users/{uid}` with the Firebase UID, not the email address. The app waits for `onAuthStateChanged()` before showing login or profile screens, clears old profile state on sign-out, and the rules only allow `request.auth.uid == userId`.

Q3 uses React Context so `savedServices`, `addSavedService()`, `removeSavedService()` and the Light/Dark preference are shared without passing props through screens. AsyncStorage is read first before showing the saved list, so an old saved state is not briefly replaced by a false empty state. Writes are queued so rapid saves/removes do not leave an older write as the final stored value.

Q4 repairs the paper's defective code. `onPress={() => toggleSaved(item.id)}` waits for a press instead of running during render. `toggleSaved` uses immutable functional state updates. FlatList keys use stable alert IDs. Each card keeps its `Animated.Value`s in refs, runs a fade/upward entrance animation on mount, and saving one alert does not restart unrelated cards.

## Verified Checks

These checks were run successfully:

- `question1`: `node_modules\.bin\eslint.cmd .`
- `question1`: `npx expo export --platform android`
- `question2`: `node_modules\.bin\eslint.cmd .`
- `question2`: `npx expo export --platform android`
- `question3`: `node_modules\.bin\eslint.cmd .`
- `question3`: `npx expo export --platform android`
- `question4`: `node_modules\.bin\eslint.cmd .`
- `question4`: `npx expo export --platform android`
- `question1`: `npx expo export --platform web`
- `question2`: `npx expo export --platform web`
- `question3`: `npx expo export --platform web`
- `question4`: `npx expo export --platform web`

The Android and web export checks confirm the apps bundle successfully. Firebase runtime behaviour still needs testing after the remaining Web App config values and published rules are supplied.

## Not Yet Verified Manually

- Q1 live Firestore reads/writes, completion toggles and deletes against the real Firebase project.
- Q2 registration, restored sessions, profile reads and sign-out against the real Firebase project.
- Q2 server-side rule enforcement after publishing `question2/firestore.rules`.
- Q3 device/emulator AsyncStorage persistence after closing and reopening the app.
- Q4 visual animation timing on a real device/emulator.
- Required screenshots in `screenshots/`.
