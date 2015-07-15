#destroy and recreate the core calls ssf game...
rm -rf ~/rsb/ssf/bubblepop
mkdir -p ~/rsb/ssf/bubblepop/presentation
mkdir -p ~/rsb/ssf/bubblepop/presentation/js

#copy all of BubblePop's source...
cp -R ../samples/BubblePop/* ~/rsb/ssf/bubblepop/presentation

#copy Splyt source for data collection...
cp -R ../bin/Splyt.data.js ~/rsb/ssf/bubblepop/presentation/js
