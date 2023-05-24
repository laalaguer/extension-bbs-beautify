if [ -d ./dist-chrome ]; then
    if ! [ -z "$(ls -A ./dist-chrome)" ]; then
        rm -r ./dist-chrome/*
    fi
else
    mkdir dist-chrome
fi

# Copy
cp -r ./s1-beautify/* ./dist-chrome
# Clean up
rm ./dist-chrome/manifest-firefox.json
# Rename
mv ./dist-chrome/manifest-chrome.json ./dist-chrome/manifest.json