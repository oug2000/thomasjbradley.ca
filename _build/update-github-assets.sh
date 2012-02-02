#!/usr/bin/env sh

# Update the assets used in the online examples
wget -O static/jquery.signaturepad.min.js https://raw.github.com/thomasjbradley/signature-pad/master/build/jquery.signaturepad.min.js
wget -O static/jquery.signaturepad.css https://raw.github.com/thomasjbradley/signature-pad/master/build/jquery.signaturepad.css
wget -O static/flashcanvas.js https://raw.github.com/thomasjbradley/signature-pad/master/build/flashcanvas.js
wget -O static/json2.min.js https://raw.github.com/thomasjbradley/signature-pad/master/build/json2.min.js
wget -O static/sample-signature-output.js https://raw.github.com/thomasjbradley/signature-pad/master/examples/sample-signature-output.js

# Update the version numbers
wget -O _includes/sigpad/VERSION.txt https://raw.github.com/thomasjbradley/signature-pad/master/VERSION.txt
wget -O _includes/sigimg/VERSION.txt https://raw.github.com/thomasjbradley/signature-to-image/master/VERSION.txt
