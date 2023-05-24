if [ -d ./dist-firefox ]; then
    rm -r ./dist-firefox/
fi

mkdir dist-firefox

# Copy
cp -r ./s1-beautify/* ./dist-firefox
# Clean up
rm ./dist-firefox/manifest-chrome.json
# Rename
mv ./dist-firefox/manifest-firefox.json ./dist-firefox/manifest.json