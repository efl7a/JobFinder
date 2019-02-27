This repository is from the following course:
React Native Advanced Concepts
Stephen Grider
udemy.com's

This is a mobile app built with React Native.  It pulls from github's job API.  It allows users to scroll through a map and then search jobs for that location.  It is built using expo.  For this project to work correctly, you will need to add an expo key for the facebookLogin and a GOOGLE_MAPS_API_KEY.  I had to add the google map API since github's job API does not return longitude/latitude information with each job.

Happy Coding!

Notes:
1. .env - I had installed react-native-config, however, I found later that it does not work with expo because of how it functions (https://github.com/expo/expo/issues/83) 
